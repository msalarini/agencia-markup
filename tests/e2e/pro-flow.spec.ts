import { test, expect } from '@playwright/test';

test.describe('LucroTur PRO Flow', () => {

    test.beforeEach(async ({ page }) => {
        // Inject mock session
        await page.addInitScript(() => {
            (window as any).__MOCK_SESSION__ = {
                user: {
                    id: 'user-123',
                    aud: 'authenticated',
                    role: 'authenticated',
                    email: 'pro@example.com',
                    user_metadata: { is_pro: true }
                },
                access_token: 'mock-token',
                refresh_token: 'mock-refresh-token',
                expires_in: 3600,
                token_type: 'bearer'
            };
        });

        // Mock authentication as PRO user (network fallback)
        await page.route('**/auth/v1/user', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    id: 'user-123',
                    aud: 'authenticated',
                    role: 'authenticated',
                    email: 'pro@example.com',
                    user_metadata: { is_pro: true }
                })
            });
        });

        // Mock PRO status check
        await page.route('**/rest/v1/profiles*', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ is_pro: true })
            });
        });

        // Mock Stats API
        await page.route('**/api/calculations/stats', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    metrics: {
                        totalCalculations: 10,
                        totalRevenue: 50000,
                        totalProfit: 10000,
                        averageMarkup: 20,
                        conversionRate: 50,
                        averageTicket: 5000
                    },
                    evolution: [
                        { month: 'Nov', count: 5, revenue: 25000 },
                        { month: 'Dez', count: 5, revenue: 25000 }
                    ]
                })
            });
        });

        // Mock Calculations History
        await page.route('**/api/calculations*', async route => {
            if (route.request().method() === 'GET') {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        calculations: [
                            {
                                id: 'calc-1',
                                created_at: new Date().toISOString(),
                                package_name: 'Pacote Teste',
                                cost: 1000,
                                markup: 20,
                                final_price: 1200,
                                profit: 200,
                                currency: 'BRL',
                                status: 'saved'
                            }
                        ]
                    })
                });
            } else {
                await route.continue();
            }
        });
    });

    test('should access dashboard and see metrics', async ({ page }) => {
        await page.goto('/dashboard');

        // Check header
        await expect(page.getByText('Dashboard PRO')).toBeVisible();

        // Check metrics
        await expect(page.getByText('Total de Cálculos')).toBeVisible();
        await expect(page.getByText('10', { exact: true })).toBeVisible(); // Total calculations
        await expect(page.getByText('R$ 5.000,00')).toBeVisible(); // Ticket medio
    });

    test('should display evolution chart', async ({ page }) => {
        await page.goto('/dashboard');
        await expect(page.getByText('Evolução de Receita')).toBeVisible();
    });

    test('should display calculation history', async ({ page }) => {
        await page.goto('/dashboard');
        await expect(page.getByText('Histórico de Cálculos')).toBeVisible();
        await expect(page.getByText('Pacote Teste')).toBeVisible();
        await expect(page.getByText('R$ 1.200,00')).toBeVisible();
    });

    test('should have export report button', async ({ page }) => {
        await page.goto('/dashboard');
        const exportBtn = page.getByRole('button', { name: 'Exportar Relatório' });
        await expect(exportBtn).toBeVisible();
        await expect(exportBtn).toBeEnabled();
    });

});
