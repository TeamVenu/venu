# Initial Project Setup

## Getting Started
To properly setup our project we'll have to go through several steps.

### Step 1: Fork Repository
So that we have a singular master project that is completely clean and is not bloated with
any of our branches we are going to fork our project from TeamVenu repo to your account organization.
Any work you do will be on your repository and not TeamVenu, this will ensure that our branches are clean
and we only see what we need to see.

* Make sure you are in ```TeamVenu/venu``` as this is our Master repository.
 * ![Screenshot](https://gitlab.com/teamseven/venu/uploads/49be32066333b1dae9ee9697ebf8a969/step1fork.png)

Forking the project is like copying the project but we'll do it on your repository instead of the team so any branches
you create will stay in your repository until you are ready to add those changes to the Master.

### Step 2: Fork into your repository
A modal will appear and you'll have to choose an organization for your Venu fork. I recommend you choose your main account
repository, which is basically your username. Since I already forked into my account it doesn't appear as an option but if you read below
it appears under ```esauri/venu```.
* ![Screenshot](https://gitlab.com/teamseven/venu/uploads/169f9865ebead5922afeb81ad6546178/step2forkuser.png)


### Step 3: Clone Repository
Next you'll clone the repository to your computer. I recommend downloading SourceTree to handle git since it's easy to use and
our examples will be with SourceTree.

* SourceTree clones into an existing folder so I suggest you create a folder for Venu. 
* In SourceTree's top bar click on ```New Repository```
 * ![Screenshot](https://gitlab.com/teamseven/venu/uploads/1be521fb4215b30e4395a476a5f18e83/step3_sourcetree.png)
* Go to your fork in ```[username]/venu``` and get the URL. Again make sure you are cloning your fork not the ```TeamVenu``` repo.
 * ![Screenshot](https://gitlab.com/teamseven/venu/uploads/46c017d1cba9ed76a810004fdad75583/step4copyfork.png)
* Fill in the repo info and destination path, usually when you paste a link the Destination Path will auto fill so make sure you double check it
 * ![Screenshot](https://gitlab.com/teamseven/venu/uploads/9e6d5c6a6208c08b3eca7d9772297652/step4_clone_user_repo.png)

### Step 4: Add Remote
After Step 3 your fork should be in your computer. But we want to also add in a remote repository. What this means is that we also want a reference
to a repository we don't necessarily want in your computer. This is how we're going to get the repository in teamseven.  

* So in the navigation go to ```Repository``` and choose ```Add Remote...```.
 * ![Screenshot](https://gitlab.com/teamseven/venu/uploads/74f0800ba8870f451b5ac792cd7c19fb/step5addremote.png)
* A modal will appear and you'll want to click on ```Add```
 * ![Screenshot](https://cloud.githubusercontent.com/assets/6536121/22535580/092cdce8-e8ca-11e6-94bd-08006e88f146.PNG)
* Now go back to Github and go to ```TeamVenu/venu``` repository and get the URL. Again make sure this is TeamVenu and not your fork.
 * ![Screenshot](https://gitlab.com/teamseven/venu/uploads/233a5ef94713d5ea464f0b1336607df4/step5_copymaster.png)
* Fill in the details in the SourceTree modal. For a remote name I recommend ```Upstream``` to differentiate it from your fork.
 * ![Screenshot](https://gitlab.com/teamseven/venu/uploads/8eea16bb96636bc0cbc0874b893f07f5/step6_createremote.png)

* In the Add Remote modal you'll see it now has two remotes
 * Origin is your fork's remote (What is currently on Github under ```[username]/venu```)
 * If you named the one we just created to Upstream then you'll also see it. (This is what is in Github under ```TeamVenu/venu```)
 * ![Screenshot](https://gitlab.com/teamseven/venu/uploads/9caf554ea8fc01558114c41d121cd301/step7_remotes.png)

* Now we are all setup. These are all steps you need to do once in every computer you use.