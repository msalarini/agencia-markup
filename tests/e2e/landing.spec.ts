import { test, expect } from '@playwright/test';

test.describe('Landing Page & Calculator', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('deve exibir a seção "Pra quem é"', async ({ page }) => {
        await expect(page.getByText('Pra quem é o PricePro?')).toBeVisible();
        await expect(page.getByText('Donos de pequenas agências')).toBeVisible();
        await expect(page.getByText('Vendedores que precisam responder')).toBeVisible();
    });

    test('deve exibir a seção "Benefícios"', async ({ page }) => {
        await expect(page.getByText('Por que usar o PricePro?')).toBeVisible();
        await expect(page.getByText('Nunca mais esqueça quanto deveria ter cobrado')).toBeVisible();
        await expect(page.getByText('Padronize o markup da sua equipe')).toBeVisible();
    });

    test('deve capturar lead com sucesso', async ({ page }) => {
        // Rola até o final para garantir visibilidade (opcional no Playwright, mas bom para debug visual)
        await page.getByText('Versão PRO em breve!').scrollIntoViewIfNeeded();

        const emailInput = page.getByPlaceholder('Seu melhor e-mail');
        const submitButton = page.getByRole('button', { name: 'Me avise' });

        await emailInput.fill('e2e-test@example.com');
        await submitButton.click();

        await expect(page.getByText('Obrigado! Você está na lista.')).toBeVisible();
    });

    test('deve calcular o preço de venda corretamente', async ({ page }) => {
        // Preenche Custo = 1000,00 (digita-se em centavos: 100000)
        await page.locator('input[id="custo"]').fill('100000');

        // Preenche Markup = 20%
        await page.locator('input[id="markup"]').fill('20');

        // Verifica se o resultado é 1.200,00
        // O texto pode estar quebrado em elementos, então buscamos pelo valor formatado
        await expect(page.getByText('R$ 1.200,00').first()).toBeVisible();
    });
});
