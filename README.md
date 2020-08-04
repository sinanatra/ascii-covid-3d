### Setup

Create a bare clone of the repository:

`git clone --bare git@github.com:sinanatra/yarn-starterkit.git `

Mirror-push to the new repository:

`cd yarn-starterkit.git`

` git push --mirror  git@github.com:NEWREPOSITORY`

Remove the temporary local repository you created earlier:

`cd ..`

`rm -rf yarn-starterkit.git`

Use `yarn` to install the dependencies and launch `yarn watch` to launch the server
