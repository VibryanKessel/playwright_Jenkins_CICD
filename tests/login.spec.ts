import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Tests de la page Login avec locators privés',{tag:["@Smoke", "@TC001"]},() => {
  test('Test complet de login - succès', async ({ page }) => {
    console.log('Début du test de login réussi');
    
    // Créer une instance de LoginPage
    const loginPage = await LoginPage.create(page);
    
    // Aller sur la page
    await loginPage.goto();
    console.log('Page SauceDemo chargée');
    
    // Vérifier que les éléments sont visibles via les getters
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    console.log('✅ Tous les éléments de login sont visibles');
    
    // Effectuer le login
    await loginPage.login('standard_user', 'secret_sauce');
    console.log('✅ Méthode login() exécutée');
    // Vérifier la redirection
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    console.log('✅ Redirection vers inventaire réussie');
  });

  test('Test de login avec erreur', async ({ page }) => {
    console.log('Test de login avec erreur');
    
    const loginPage = await LoginPage.create(page);
    
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');
    
    // Vérifier que l'erreur est visible via le getter
    await expect(loginPage.errorMessage).toBeVisible();
    console.log('✅ Message d\'erreur visible');
    
    // Tester les méthodes d'erreur
    const isErrorVisible = await loginPage.isErrorVisible();
    expect(isErrorVisible).toBe(true);
    console.log('✅ isErrorVisible() retourne true');
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
    console.log('✅ getErrorMessage() retourne le bon message');
  });

  test('Test avec utilisateur bloqué', async ({ page }) => {
    console.log('Test avec utilisateur bloqué');
    
    const loginPage = await LoginPage.create(page);
    
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    
    // Vérifier le message d'erreur spécifique
    const isErrorVisible = await loginPage.isErrorVisible();
    expect(isErrorVisible).toBe(true);
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('locked out');
    console.log('✅ Message d\'utilisateur bloqué détecté');
  });
});
