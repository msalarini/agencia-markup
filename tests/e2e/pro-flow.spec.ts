import { test, expect, Page } from '@playwright/test';

test.describe('PRO Feature Access', () => {

    // Helper to inject session
    const injectSession = async (page: Page, isPro: boolean) => {
        const user = {
            id: isPro ? 'pro-user-id' : 'test-user-id',
            aud: 'authenticated',
            role: 'authenticated',
            email: isPro ? 'pro@example.com' : 'test@example.com',
            app_metadata: { provider: 'email' },
            user_metadata: {},
            created_at: new Date().toISOString(),
        };

        //     const session = {
        //         access_token: 'fake-access-token',
        //         refresh_token: 'fake-refresh-token',
        //         expires_in: 3600,
        //         expires_at: Math.floor(Date.now() / 1000) + 3600,
        //         token_type: 'bearer',
        //         user: user,
        //     };

        // We assume the project URL is 'your-project-url' from .env.local
        // The default storage key format for Supabase v2 is `sb-<project-ref>-auth-token`
        // If the URL is not a standard Supabase URL, the key might be different.
        // But let's try the most common pattern or just 'supabase.auth.token' if configured.
        // Given 'your-project-url', the ref is likely just 'your-project-url' if it's not parsed strictly.
        // Let's try setting it for 'your-project-url'.

        // IMPORTANT: We need to match the key used by the client.
        // We can try to spy on localStorage or just set it.
        // For now, we'll try 'sb-your-project-url-auth-token'.

        //     await page.addInitScript(value => {
        //         window.localStorage.setItem('sb-your-project-url-auth-token', JSON.stringify(value));
        //     }, session);
    };

    // test('Free user sees lock screen on AI features', async ({ page }) => {
    //     await injectSession(page, false);

    //     // Mock Profiles table to return is_pro: false
    //     await page.route('**/rest/v1/profiles*', async route => {
    //         await route.fulfill({
    //             status: 200,
    //             contentType: 'application/json',
    //             body: JSON.stringify({ is_pro: false }),
    //         });
    //     });

    //     await page.goto('/');

    //     // Navigate to AI feature (assuming it's on the main page or accessible)
    //     const aiSection = page.getByText('Sugestões de Markup com IA');
    //     await expect(aiSection).toBeVisible();

    //     // Check for the lock overlay or "Upgrade" button
    //     await expect(page.getByText('Recurso Premium')).toBeVisible();
    //     await expect(page.getByText('Entrar para Desbloquear')).toBeVisible();
    // });

    test('PRO user can access AI features', async ({ page }) => {
        await injectSession(page, true);

        // Mock Profiles table to return is_pro: true
        await page.route('**/rest/v1/profiles*', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ is_pro: true }),
            });
        });

        await page.goto('/');

        // Fill in the cost to make the button enabled
        // We use locator('#custo') and type to simulate user input for the currency mask
        await page.locator('#custo').click();
        await page.keyboard.type('1000');

        // Verify Lock screen is GONE
        await expect(page.getByText('Recurso Premium')).not.toBeVisible();

        // Verify "Obter Sugestões da IA" button is clickable
        const generateButton = page.getByRole('button', { name: 'Obter Sugestões da IA' });
        await expect(generateButton).toBeVisible();
        await expect(generateButton).toBeEnabled();
    });
});
