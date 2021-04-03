import { App } from './lib/app'

const PORT = 4000

App().listen(PORT, () => console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`))