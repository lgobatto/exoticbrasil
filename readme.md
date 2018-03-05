# Vera Roca Digital Skeleton

A framework for deploying WordPress projects with Capistrano:

- Automates WordPress deployments via git/github on any number of environments
- Automates database migrations between environments
- Removes all references to development URLs in production environments (and vice versa)
- Sychronises your WordPress `uploads/` directories between environments
- Automatically prevents non-production environments from being crawled by search engines

Note that **Vera Roca Digital Skeleton** is pretty strict about how you work with WordPress and git, and it may be different to what you're used to. Be sure to read [Notes on WordPress development](https://github.com/Mixd/wp-deploy/wiki/Notes-on-WordPress-development) before starting.

## Requirements

For **Vera Roca Digital Skeleton** (or Capistrano in general) to work you need SSH access both between your local machine and your remote server, and between your local machine and your GitHub account.

Capistrano deploys your application into a symlinked `current/` directory on your server, so you'll need to set your document root to that folder.

- **Bundler**: As **Vera Roca Digital Skeleton** comes with various different Ruby Dependencies, Bundler is used to make quick work of the installation process. Here's the [link](http://bundler.io/)
- **WP-CLI**: **Vera Roca Digital Skeleton** also requires the automation of WordPress functions directly in the Command Line. As these functions are required on all environments (local, staging and production servers), we make use of the WordPress Command Line Interface. You can check out the [documentation](http://wp-cli.org/#install) on how to get this setup.
- **Vagrant**: **Vera Roca Digital Skeleton** also requires the vagrant to bring up a virtual machine with all configurations needed and to make sure development is in the same environment through all team members. You can check out the [documentation](https://www.vagrantup.com/) on how to get this setup.
- **Virtual Box**: **Vera Roca Digital Skeleton** also requires the Virtual Box to hoste the vagrant machine. You can [download](https://www.virtualbox.org/wiki/Downloads) it here.

### Keep in Mind
If you're using MAMP, you'll have issues when trying to run MySQL commands as the PHP version in MAMP is different to the one in your $PATH. You can fix this by adding the following two lines to your `.bash_profile` (or `.zshrc`):

```sh
export MAMP_PHP=/Applications/MAMP/bin/php/php5.4.4/bin
export PATH="$MAMP_PHP:$PATH"
```

Be sure you check the PHP version is correct and amend the path appropriately for your MAMP PHP version. see [this question on Stack Overflow](http://stackoverflow.com/questions/4145667/how-to-override-the-path-of-php-to-use-the-mamp-path/) for more info.

- - -

## Installation
Here's a step by step guide of getting **Vera Roca Digital Skeleton** setup.

### Getting started
Firstly, you're going to need to clone the repository. There are a number of ways in which you can do this, however, seeing as this workflow requires the use of the Command Line, I'd recommend doing it in that.
```sh
cd my/desired/directory
git clone --recursive project-git-url new-project
```
That will clone the repository into a folder name of your choosing and it'll also download any submodules included within the repository. In this case, we have included WordPress.
Now CD into the repository directory.

Secondly, install the Ruby dependencies for the framework via Bundler:
```sh
$ bundle install
```

Thirdly, run vagrant up from repository dir, this will bring the virtual machine up and setup the shared folders, mysql and all dependencies automatically.
Add you virtual machine IP to the end of your hosts file and point to this domain: link.local example: 38.178.30.114   link.local

Fourthly, run from command line: wp db import

Finally, run from command line: wp search-replace http://link.veracool.com http://link.local

#### .wpignore

By default, Capistrano deploys every file within in your repo, including config files, dotfiles, and various other stuff that's of no use on your remote environment. To get around this, **Vera Roca Digital Skeleton** uses a `.wpignore` file which lists all files and directories you don't want to be deployed, in a similar way to how `.gitginore` prevents files from being checked into your repo.

#### Slack Integration

**Vera Roca Digital Skeleton** makes use of [capistrano-slackify](https://github.com/onthebeach/capistrano-slackify) to trigger deployment notifactions to Slack. This is optional, but can be pretty handy if you're a Slack user. You just need to add your Slack incoming webhook token and subdomain in the `config/slack.rb` and you're good to go.


### Usage

#### Setting up environments

To set up WordPress on your remote production server, run the following command:

```sh
$ bundle exec cap production wp:setup:remote
```

This will install WordPress using the details in your configuration files, and make your first deployment on your production server. **Vera Roca Digital Skeleton** will generate a random password and give it to you at the end of the task, so be sure to write it down and change it to something more momorable when you log in.

You can also automate the set-up of your local environment too, using `wp:setup:local`, or you can save time and set up both your remote and local environments with `wp:setup:both`.

#### Deploying

To deploy your codebase to the remote server:

```sh
$ bundle exec cap production deploy
```

That will deploy everything in your repository and submodules, excluding any files and directories in your `.wpignore` file.

#### Database migrations

__WARNING__: Always use caution when migrating databases on live production environments – This cannot be undone and can cause some pretty serious issues if you're not fully aware of what you're doing.

Migrating databases will also automatically replace development URLs from production databases and vice versa.

To push your local database to the remote evironment:

```sh
$ bundle exec cap production db:push
```

To pull the remote database into your local evironment:

```sh
$ bundle exec cap production db:pull
```

To take a backup of the remote database (without importing to your local env.):

```sh
$ bundle exec cap production db:backup
```

That will save an `.sql` file into a local `db_backups/` directory within your project. All `.sql` files are – and should stay – git ignored.

#### Syncing uploads

You can pull and push the WordPress uploads directory in the same way as you can with a database. Pushing from local to an environment or Pulling from an environment to local:

```sh
$ bundle exec cap production uploads:pull
$ bundle exec cap production uploads:push
```

#### Updating WordPress core

To update the WordPress submodule to the latest version, run:

```sh
$ bundle exec cap production wp:core:update
```

# Notes on WordPress Development

**Vera Roca Digital Skeleton** is pretty strict about how you develop with WordPress and git, and this will likely differ to how you already work. This page is dedicated to explaining how and why to work within this framework.

## WordPress core

WordPress core is provided as a git submodule. This is great for a number of reasons:

- Helps keep your codebase more modular – your content is kept separate from your WordPress installation
- Ensures everyone working on the project is using the same WP version
- It's easy to update WordPress under version control

You should never edit any files within the submodule. Your `wp-config.php` is generated automatically during setup, so you shouldn't try and create/edit this yourself.

**Vera Roca Digital Skeleton** comes with a task to update WordPress core to the latest stable version:

```sh
$ bundle exec cap production wp:core:update
```

That basically change directory to `wordpress/`, looks for the latest tag, and checks it out. If you'd prefer to update manually, or want to switch to a particular version then it's easy to do manually:

```sh
$ cd wordpress
$ git fetch --tags
$ git checkout 3.8.1
```

## WordPress plugins and themes

Plugins and themes should be checked into your repository so that they deploy via Capistrano. Plugins/themes are stored in `content` rather than the `wp-content` directory in a traditional WordPress install.

Plugin updates should always be carried out locally and committed to the repository. If you update a plugin in a remote environment, it will be overwritten on your next deployment.

## WordPress uploads

WordPress uploads should NOT be checked into your repository. These are synced between environments with the `uploads:sync` task.