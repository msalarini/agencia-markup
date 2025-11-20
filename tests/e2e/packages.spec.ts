import { test, expect } from '@playwright/test';

test.describe('Gerenciamento de Pacotes (CRUD)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
    });

    test('deve salvar um novo pacote', async ({ page }) => {
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('✅ Pacote salvo com sucesso!');
            await dialog.accept();
        });

        await page.getByLabel('Nome do Pacote').fill('Pacote Teste');
        await page.locator('input[id="custo"]').fill('100000');
        await page.locator('input[id="markup"]').fill('20');
        await page.getByRole('button', { name: 'Salvar Pacote' }).click();

        await expect(page.getByRole('button', { name: 'Meus Pacotes (1)' })).toBeVisible();
    });

    test('deve visualizar pacotes salvos', async ({ page }) => {
        page.on('dialog', async dialog => await dialog.accept());

        await page.getByLabel('Nome do Pacote').fill('Pacote Visualizar');
        await page.locator('input[id="custo"]').fill('50000');
        await page.getByRole('button', { name: 'Salvar Pacote' }).click();

        await page.getByRole('button', { name: 'Meus Pacotes' }).click();
        await expect(page.getByText('Pacote Visualizar')).toBeVisible();
    });

    test('deve carregar um pacote para edição', async ({ page }) => {
        page.on('dialog', async dialog => await dialog.accept());

        await page.getByLabel('Nome do Pacote').fill('Pacote Original');
        await page.locator('input[id="custo"]').fill('50000');
        await page.locator('input[id="markup"]').fill('25');
        await page.getByRole('button', { name: 'Salvar Pacote' }).click();

        await page.getByRole('button', { name: 'Meus Pacotes' }).click();

        const card = page.locator('.hover\\:shadow-md', { hasText: 'Pacote Original' });
        await card.locator('button').first().click();

        await expect(page.getByLabel('Nome do Pacote')).toHaveValue('Pacote Original');
        await expect(page.locator('input[id="markup"]')).toHaveValue('25');
    });

    test('deve duplicar um pacote', async ({ page }) => {
        page.on('dialog', async dialog => await dialog.accept());

        await page.getByLabel('Nome do Pacote').fill('Pacote para Duplicar');
        await page.locator('input[id="custo"]').fill('50000');
        await page.getByRole('button', { name: 'Salvar Pacote' }).click();

        await page.getByRole('button', { name: 'Meus Pacotes' }).click();

        const card = page.locator('.hover\\:shadow-md', { hasText: 'Pacote para Duplicar' });
        await card.locator('button').nth(1).click();

        await expect(page.getByLabel('Nome do Pacote')).toHaveValue('Pacote para Duplicar (cópia)');
    });

    test('deve excluir um pacote', async ({ page }) => {
        let dialogCount = 0;
        page.on('dialog', async dialog => {
            dialogCount++;
            if (dialogCount === 1) {
                expect(dialog.message()).toBe('✅ Pacote salvo com sucesso!');
            } else if (dialogCount === 2) {
                expect(dialog.message()).toBe('Tem certeza que deseja excluir este pacote?');
            }
            await dialog.accept();
        });

        await page.getByLabel('Nome do Pacote').fill('Pacote para Excluir');
        await page.locator('input[id="custo"]').fill('50000');
        await page.getByRole('button', { name: 'Salvar Pacote' }).click();

        await page.getByRole('button', { name: 'Meus Pacotes' }).click();

        const card = page.locator('.hover\\:shadow-md', { hasText: 'Pacote para Excluir' });
        await card.locator('button').nth(2).click();

        await expect(page.getByText('Pacote para Excluir')).not.toBeVisible();
    });

    test('deve limpar campos ao clicar em Limpar', async ({ page }) => {
        await page.getByLabel('Nome do Pacote').fill('Teste');
        await page.locator('input[id="custo"]').fill('100000');
        await page.locator('input[id="markup"]').fill('20');

        await page.getByRole('button', { name: 'Limpar' }).click();

        await expect(page.getByLabel('Nome do Pacote')).toHaveValue('');
        await expect(page.locator('input[id="custo"]')).toHaveValue('');
        await expect(page.locator('input[id="markup"]')).toHaveValue('');
    });
});
