# Repositório Git com NestJS, Express, Webpack e TypeScript

Este repositório contém um projeto desenvolvido com o framework NestJS, utilizando o Express como servidor HTTP, o Webpack para empacotar e transpilar o código fonte, e o TypeScript como linguagem de programação. Neste arquivo README, você encontrará informações sobre as versões utilizadas, como fazer o deploy, configurar as variáveis de ambiente, como testar e como instalar o projeto.

## Dependências

- NestJS
- Express
- Webpack:
- TypeScript

## Configuração inicial

Os seguintes passos deve ser seguidos antes de fazer o deploy do projeto na ordem apresentada a seguir:

1. Rodar o script pre development

```bash
node scrits/pre_development.js
```

2. Alterar o nome do projeto e descrição de stack

```js
// serverless/index.ts

// Esse nome é usado na construção das lambdas. Ex: example-service-mylambda-dev
// Bom manter consiso
const SERVICE_NAME = 'example-service';
// Nome da stack no cloud formation
const SERVICE_DESCRIPTION =
  'template-sls-ts cloud formation stack description';
```

3. Adicionar Segredos e Variáveis de Ambiente

```bash
## Secrets
# Acesso a aws para o serverless conseguir criar os recuros durante o deploy
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
# Por padrão não é necessário adicionar, a não ser que no projeto esteja sendo utilizado pacote privado npm
NPM_TOKEN

## Env Variables
# Não precisa configurar. Automaticamente configurado de acordo com o branch
# development -> dev
#     staging -> stg
#        main -> prd
STAGE
```

### Configurações padrão

- **AWS Gateway Api Key**: É configurada a chave `{STAGE}-internal` para todo api criada via repo. Ou seja, todas as apis criadas com esse template vão compartilhar o mesmo `x-api-key` no mesmo ambiente (dev, stg, prd).

## Teste Local

### Utilização de pacotes npm privado (uso local)

- Criar token _classic_ em https://github.com/settings/tokens. O token terá o formato `ghp_****bGhjMY9wYem6tHwCgPRls6Gbu939****`
- Adicionar em .npmrc o token. `//npm.pkg.github.com/:_authToken={NPM_TOKEN}` -> `//npm.pkg.github.com/:_authToken=ghp_****bGhjMY9wYem6tHwCgPRls6Gbu939****`
- Descomente o a linha com `@custom_user_or_org:registry=https://npm.pkg.github.com/`
- Descomentar código relacionado ao repositório npm no github workflow `.github/workflows/deploy-service.yml`

```bash
  ## Antes
  # - name: Inject NPM_TOKEN to .npmrc
  #   run: |
  #     echo "//npm.pkg.github.com/:_authToken=${{ secrets.NPM_TOKEN }}" >> ./.npmrc

  ## Depois
  - name: Inject NPM_TOKEN to .npmrc
    run: |
      echo "//npm.pkg.github.com/:_authToken=${{ secrets.NPM_TOKEN }}" >> ./.npmrc
```

- Pronto para realizar `npm install` (don't support other package managers)

## Deploy

O deploy é realizado através do push para um dos branches `development`, `staging` ou `main`.
