# Git Basics
## Now that we have our project setup these are some steps you'll do frequently throughout the project.

### Step 1: Fetch to update our remotes
We want to update our remote from Github every time we want to start working to make sure everything is up to date.

* To do this click on ```Fetch``` in the top bar
 * ![Screenshot](https://gitlab.com/teamseven/venu/uploads/acebc00fb5f04d8eb3bd3e1a4e623d7c/step8_fetch.png)
* Note: This won't actually update the files that are in your project, only the references in remote.

### Step 2: Pull to update our local project
After we have fetched we want to pull any changes from ```TeamVenu/venu``` into our local copy of Venu.
This will update our local files.

* First select and click a branch we want to update
 * We usually want to update our local master so that it always stays a one-to-one copy to teamseven's master
 * But you can also update your other branches in case you were working on one of them and need to update it
* Click ```Pull``` in the top bar
* In the modal
 * Make sure in ```Pull from remote``` that the ```TeamVenu``` remote branch is selected and NOT ```origin```. Remember ```origin is your forks Github files not teamseven's.
 * Under ```Remote branch to pull``` there should only be one option (```master```) since we want that repo clean. If it at first does not appear click the refresh button.
 * Lastly, make sure in ```Pull into local branch```, you are in the actual branch you want to pull into. If not click Cancel and double-click on that branch and start the pull all over again.
 * ![Screenshot](https://gitlab.com/teamseven/venu/uploads/2141efbaa44718e878151d16f2116c54/step9_pull.png)
 
 ### Step 3: Create a branch
 Alright now that everything is updated, we want to start working on a feature. But we don't want to touch our master branch doing so pollutes it, we want our local master to always be the same as ```TeamVenu/master```. If you accidentally start working on master don't worry, as long as you don't commit we can move those changes to a branch so check out ```Stashing``` below. Everytime we want to add a feature we want to make a branch specifically for that feature.
 We also don't want our branch to be huge and contain many changes which could conflict with other user's changes as well as be a pain to review (We wouldn't want one tiny error to hold up a ton of other changes).
 
 * Start from the master branch so make sure your master branch is selected
  * Since master branch is meant to be a one-to-one copy with the Project's actual master it should always be updated. (See Fetch & Pull above)
 * Click on the ```Branch``` button in the top bar
 * Give it a name related to the feature your adding/changing
  * Names can't have spaces
* Create your branch, make sure it is selected in the project panel and start working!
 * ![Screenshot](https://gitlab.com/teamseven/venu/uploads/3497246e55e1f30851435513d78cf945/step10_branch.png)
* Remember you can always update a branch so that it stays current

### Step 4: Committing changes
Now that you've made some changes you can start committing them so they're saved to your local branch. This allows you to track a file's history in case you need to go back
and see a previous commit's changes. 

* To commit Stage all the files you want to commit, write a brief description of your changes and click commit
 * ![Screenshot](https://gitlab.com/teamseven/venu/uploads/36e5cd20c5018d8b22e0c6026ad240f9/step12_commit.png)

### Step 5: Stash
Let's say you started making changes but you did not realize your current branch is master. You don't want to pollute master but you also don't want to discard everything you've added.
Or let's say you were working in a branch but an emergency arose and you need to go into another branch to fix a game breaking bug, but you aren't ready to commit yet. You can always stash your changes, which means it will hold your changes but won't apply them to the current branch.

* What you want to do is Stage your files and click on ```Stash``` in the top bar. 
 * Give it a descriptive name so you know what you're stashing
 * ![Screenshot](https://gitlab.com/teamseven/venu/uploads/3c82cd064490f312555b19675e0b0233/step12_stash.png)
* When you want to apply that stash to a branch
 * Select the branch and make sure you're in it
 * On the ```Stashes``` section right-click and choose Apply stash on...
 * ![Screenshot]https://gitlab.com/teamseven/venu/uploads/a3e28ab3d8cc354ef9402576821776d0/step13_applystash.png)
 * When you're done I recommend you delete it to clean up your stashes

### Step 6: Pushing to Github
Now that we have committed our changes in our branch, we want to submit these changes to our Github repo so we can also update the project.

* Once we have committed:
 * Click on ```Push``` in the top bar
 * Make sure under ```Push to repository``` it says ```origin``` not ```Upstream```
 * Select the local branch to push and the remote branch to push into (if this is your first push into a branch the remote will appear with the same name automatically)
 * Make sure the local branch is the same as the remote branch, we don't want to accidentally push to our fork master from a local branch that isn't master
 * ![Screenshot](https://gitlab.com/teamseven/venu/uploads/a2f4667d26707fb4c098bc56481cde41/step14_push.png)
 * Click Push
  * If there are errors you will need to fix those otherwise wait while SourceTree is updating your Github fork
  * Note: If you have updated your local master branch from ```Upstream``` you want to push to your fork's master (aka origin)

### Step 7: Create Pull Request
Now that we've pushed to our fork we want to create a ```Merge Request``` to update our main project. 
* Head over to Github and if you go to teamseven/venu you'll see the new branch you push will appear and it will ask if you want to Compare and make a Merge Request. Click it.
 * ![Screenshot](https://gitlab.com/teamseven/venu/uploads/1a3922c271c2ee29fb8fa1328d0e57f6/create_merge.png)
* First, make sure the base fork is ```TeamVenu/venu```, the head fork is your fork and under compare is the branch you want to merge
* When openning a Merge Request give it an appropriate and short title and a description of all your changes.
* On the sidebar you can request a review from an admin, assign someone to check your changes, add labels that specify what the PR is about, and it has milestones
* If you are unable to merge because of conflicts you will have to fix those
* Once you're done create the Merge Request
 * ![Screenshot](https://gitlab.com/teamseven/venu/uploads/2234099ed8ce4cfe4116090f3dcbea28/add_merge.png)
* One the PR is created you have to wait for someone to review and merge the PR, so keep working on other features
* Once your PR is merged, I advise you to delete your branch so your fork stays clean
 * Also delete branches you don't need locally in SourceTree