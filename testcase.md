#title
DOM CRUD without libraries.

#describe
Tester will observer a web page that can create via text input field a list of displayed text posts. These posts can be selected and become highlighted. In this highlighted state the user will be able edit the text and permanently delete the post from the list.

- The input area will display word and character counts during creation.   
- When post is created the input text area will reset, as will the counts.
- A clear button will reset the input and counts.
- The displayed posts will have timestamp, noting the time of creation.
- A click on a post will reveal edit ('✎') and delete ('x') buttons

#assumptions and preconditions
After forking the repo the tester should need only to open the index.html file in a browser tab. Page will load with a text input field, the text line "word count : 0 and // character count : 0", a "post" button, and a "clear" button.  

#testing steps

1. Enter the text: "I'm happy, even on rainy days." into the "input text" field.  
##expected result
The word count with be 6 and the character count will be 30.

2. Delete the text by using the "delete" key on your keyboard. Observe that the count changes correctly.
##expected result
Word and character count will decrease.

3. Reenter the text: "I'm happy, even on rainy days" then delete the text by clicking "clear".    
##expected result
The text area will be reset as with word and character counts, focus will be set to the text input area.  

4. Reenter the text: "I'm happy, even on rainy days" then click the "post" button.(take note of time of the post)
##expected result
A "post" will be created below the buttons and will display: "I'm happy, even on rainy days" and a timestamp.
