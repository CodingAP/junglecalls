# RazorHack CTF - Jungle Calls Web Challenge

### by AP

### Writeup
https://codingap.github.io/blog/posts/razorhack-ctf/

## Prose:
Back in the 90s, a messaging app called Jungle Calls was used by RazorPower Co. in the late 90s to communicate between different stations. It seemed to be top of the class back in the day, but now we can't seem to know how to use it. We have a partially tore off page of some marketing material that reads:

> Thank you for purchasing 'Jungle Calls Messaging Service' for use in your company! We are delighted that you chose us for your communication needs. We provide many solutions to all of your problems, including instant text messages reliably coming through all channels, automatic replys, and the *all-new* server features that allow the chats to be responded to by any device (physical or otherwise). To find more information about this service and how to use it, simply dial...

...and that was all that we have on us. We somehow got it converted into a modern language to be useful again, but the code isn't the best. Your goal is to look through this web service and find any tid bits that may be important to us. Anything that has the format `flag{insert flag here}` will definitely suffice. Good luck!

## Challenges

### Challenge #1 - Hidden in the Forest
> Wow, we really did a bad job at converting this code! Well, that's what happens when using a COBOL-Fortran-C++-Java-Malbolge-JavaScript converter...

This challenge just consist of deobfuscating some of the JS code of the user page after the user has created an account. It will probably just be a script that prints to the console, but in the process has the flag in there. All the code will be obfuscated, so finding the right file will be slightly difficult. (note: it is actually in the clippy script now)

Flag: `flag{h4ck_4nd_5l45h_43872}`

### Challenge #2 - King of the Jungle
> You should probably create an account if you want to get any use out of it, but only the admins have any fun with it...

After creating an account and signing in, you will be given a JWT token that has some info about the user. In there as well is a `ADMIN_MODE` which should be set to false most of the time; however, if you change you cookie to set `ADMIN_MODE` to true, then you get an admin dashboard with access to all the messages (not directly) and the flag in the description.

Flag: `flag{1m_th3_k1ng_n0w_09438}`

### Challenge #3 - A"Cross" the River
> You know, I think the old CEO would have an account on here, here let me see... Ah yes! His username is `ceo-man-123` still...

Obviously, sending XSS in the messaging part will work. Wonders of 90s technology. Sending images with an onerror attribute will work for this XSS stuff. To get the flag from this user, you need to access their description, which has it hidden by default. This user can use some webhook or service that sends whatever the html or description says of the user. Or you can get their cookie and log in to their account.

Flag: `flag{x5s_5t1ll_w0rk5_38104}`

### Challenge #4 - So many Trees and Logs!
> You know, for a service that hasn't been used in a long time, there is still a lot of stuff left behind... It seems like it has been online for years!

Each message between users will be stored in user_messages. People can see that messages are stored in this URL because the website will request it to show all messages. Only admins have access to the messages in total through a route under user_messages/. Luckily, we already know how to turn ourselves into admins with `ADMIN_MODE`, but how would we know what user to look for. Well, old_ceo_123 has some messages to other accounts; however, there is so many messages between hundreds of employees, where they also have messages between hundreds of employees. I intend for them to parse the entire message history with some program to find the flag (it will be under the log `ceo-man-123!employee4522.log`)

Flag: `flag{7h4ts_4l0t_0f_l0g5_32121}`

### Challenge #5 - Flashy Leaves
> I think my favorite feature is the random button in the global chat, sends a cute emoji that draws me towards it...

In the global chat, there will be a feature to send a random emoji to the chat. Hopefully people spam it because it's cool but that will send a request to a computer connected to a speaker that tries to draw people to it where there will be a flag written next to it. The only way to find it will be following the speaker and light, so hopefully no one finds it naturally.

Flag: `flag{ju57_a5_I_pl4nn3d_32187}`

### Challenge #6 - Timing is Everything
> A very nice bot seems to welcome you everytime you join the global chat, but it's always off with the time...

In the global chat, there will be a bot that tells the time wrong (probably some side effect of Y2K). However, if you message the bot, you will be sent the flag. You can also find the flag by searching through all the messages through `ADMIN_MODE`, but that will probably apply to teams who get it later (because teams will get the flag by sending a message)

Flag: `flag{c10ck_m4y_b3_wr0ng_74392}`
