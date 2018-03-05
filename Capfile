# Load DSL and Setup Up Stages
require 'capistrano/setup'

# Includes default deployment tasks
require 'capistrano/deploy'

require 'capistrano/composer'
require 'capistrano/npm'
require 'capistrano/bower'
require 'capistrano/gulp'

# Include custom strategy for deploying git submodules
require 'capistrano/git'
require './lib/capistrano/submodule_strategy'

# Includes everything else
require 'yaml'

# Loads custom tasks from `lib/capistrano/tasks' if you have any defined.
Dir.glob('lib/capistrano/tasks/*.cap').each { |r| import r }
