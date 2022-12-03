# Angular OData samples

Some sample projects of [Angular OData](https://www.npmjs.com/package/angular-odata).

This contains:

- Microsoft Graph OData

## Running development server

### Microsoft Graph OData

Edit .env file.

```console
cp .env.microsoft-graph-sample .env
vi .env
```

You may see two variables.

- **TENANT_ID** is ID of your Azure Active Directory
- **CLIENT_ID** is ID of the Application what you created

Start development server.

```console
npm run start:microsoft-graph
```

Open http://localhost:4200/
