# deno-update-dependencies-workflow

GitHub Actions Workflow to update Deno dependencies

# Getting started 

* **Create a GitHub Actions Workflow that runs this project**

```yml
name: Update Deno dependencies 

on:
  workflow_dispatch:
  schedule:
    - cron: "0 0 * * 0" # every Sunday at 12am. https://cron.help/#0_0_*_*_0

jobs:
  update-dependencies:
    uses: levibostian/deno-update-dependencies-workflow/.github/workflows/update-deps.yml@main
    permissions: 
      pull-requests: write # to create new PRs 
      contents: write # to push code to branches 
    with:
      files: deps.ts # required input      
```

* **Modify your GitHub repository settings to allow PRs to get created**

You must [modify a setting in your GitHub repository](https://github.com/peter-evans/create-pull-request#workflow-permissions) to allow this project to create a pull request. Without modifying this setting, you will receive an error message *"GitHub Actions is not permitted to create or approve pull requests."* when running this workflow. 

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

      # Destination branch name for the PR to get merged into. Default: main
      pr-base-branch: main 

      # Optional GitHub token used when creating pull request. 
      # See section "Create automated tests" in these docs to learn more about why you might provide this. 
      github-token: ${{ secrets.GH_PUSH_ACCESS_TOKEN }}

      # Create or update existing lock file. 
      # Learn more about lock files: https://deno.com/manual/basics/modules/integrity_checking
      # Note: Even if this file already exists, you need to enter this input. The workflow will not find this file automatically for you. 
      lock-file: deno.lock
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

GitHub Actions has a security mechanism setup where `on: pull_request` workflows will *not* be executed on pull requests that are automatically created. That means that by using this project, there is a chance that your automated tests will not be executed when the automated pull request gets created by this project. 

[There are workarounds](https://github.com/peter-evans/create-pull-request/blob/main/docs/concepts-guidelines.md#triggering-further-workflow-runs) if you are interested. You can provide an optional `github-token` input for this workflow if you need to provide a GitHub token. 

### Optional: Specify rules for how dependencies are updated 

You can modify your dependencies in your source code files to [specify update behaviors](https://github.com/hayd/deno-udd#semantic-versioning). 

# Credits 

Thanks to the great [Deno `udd` tool](https://github.com/hayd/deno-udd) that makes this all possible. 

Thanks to [the `udd` contributors who created the example workflow](https://github.com/hayd/deno-udd#scheduled-github-action) that inspired me to create this workflow for my projects. 
