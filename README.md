# Open Source Text Editor for Parkinson's

People with diseases such as Parkinson's have a hard time communicating.

This text editor, when loaded in a browser and paired with an accessible keyboard, will allow a disabled person to type.
My grandfather can't speak due to Parkinson's, and though he gets occaisonal hand tremors he can control his hand just enough to interface with a keyboard.
This IDE is a solution to that; with an autocorrect algorithm, he can make type the gist of a word and it will guess his intention. 

To do list:
1. Therapist or loved one should be able to input their own dictionary of words for the patient's common mistakes. In the algorithm, entries adjacent to this list will be prioritized.
2. Incorporate merriam webster wordlist into dictionary of known words
3. AI word completion implementation?
4. Remove delay in presenting words on screen
5. Remove the need for space after autocorrect. Thus, the algorithm needs to iteratively check with each Keyup.
6. Add newline and expand text box
7. Make custom keyboard with vibration-based haptic feedback and guardrails on each large key. Currently we're using off-shelf hardware: https://logickeyboard.com/shop/largeprint-black-on-3254p.html
