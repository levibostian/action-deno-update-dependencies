# deno-update-dependencies-workflow

GitHub Actions Workflow to update Deno dependencies

# Getting started 

```yml
name: Update Deno dependencies 

on:
  workflow_dispatch:
  schedule:
    - cron: "0 0 * * *" # every day at 12am. https://cron.help/#0_0_*_*_*

jobs:
  update-dependencies:
    uses: levibostian/deno-update-dependencies-workflow/.github/workflows/update-deps.yml@main
    with:
      files: deps.ts # required input
```

## Inputs 

You can customize this workflow with the following options: 

```yml
jobs:
  update-dependencies:
    uses: levibostian/deno-update-dependencies-workflow/.github/workflows/update-deps.yml@main
    with:
      # Glob or space-separated list of files to update. Example: `deps.ts main.ts` or `*.ts`. 
      # Accepts anything that udd tool accepts: https://github.com/hayd/deno-udd#usage
      files: deps.ts 

      # The title of the PR that gets created by workflow 
      # optional input. 
      # Default value: 'refactor: update Deno dependencies'
      pr-title: '[bot] Update Deno dependencies'
```

### Optional: Create automated tests 

It's optional, but recommended to write some automated tests in your project that uses this automated workflow. That way when a PR gets created by this workflow, you can merge the PR and feel confident that your app is not broken. 

Create a GitHub Action workflow that runs on every PR and executes your tests. Here is a basic workflow example that does this: 

```yml
name: Run tests on every PR

on: 
  pull_request:

jobs:
  run-tests:
    ...
```

### Optional: Specify rules for how dependencies are updated 

You can modify your dependencies in your source code files to [specify update behaviors](https://github.com/hayd/deno-udd#semantic-versioning). 

# Credits 

Thanks to the great [Deno `udd` tool](https://github.com/hayd/deno-udd) that makes this all possible. 

Thanks to [the `udd` contributors who created the example workflow](https://github.com/hayd/deno-udd#scheduled-github-action) that inspired me to create this workflow for my projects. 