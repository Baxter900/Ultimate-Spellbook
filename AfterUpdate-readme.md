After update, check that in lib/vote, getVotePower contains this:


var power = 1 + user.karma/10;
if(isAdmin(user)){
  power *=3;
}
//console.log(power);
return Math.round(power);

Check that the redistribute karma setting is correct in lib/vote upvoteItem

Check that the redistribute karma setting is uncommented in collections/settings

Redo the newsletter into:
  "receive_the_best_of": "Sign up for the",
  "right_in_your_inbox": "newsletter and get the best spells emailed to you!",