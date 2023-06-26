# Open Source Text Editor for Parkinson's

People with diseases such as Parkinson's have a hard time communicating.

This text editor, when loaded in a browser and paired with an accessible keyboard, will allow a disabled person to type.
My grandfather can't speak due to Parkinson's, and though he gets occasional hand tremors he can control his hand just enough to interface with a keyboard.
This IDE is a solution to that; with an autocorrect algorithm, he can type the gist of a word and it will guess his intention. 

To do list:
1. Therapist or loved one should be able to input their own dictionary of words for the patient's common mistakes. In the algorithm, entries adjacent to this list will be prioritized.
2. Incorporate merriam webster wordlist into dictionary of known words
3. AI word completion implementation?
4. Remove delay in presenting words on screen
5. Remove the need for space after autocorrect. Thus, the algorithm needs to iteratively check with each Keyup.
6. Add newline and expand text box
7. Make custom keyboard with vibration-based haptic feedback and guardrails on each large key. Currently we're using off-shelf hardware: https://logickeyboard.com/shop/largeprint-black-on-3254p.html

# Hasn't this already been done?
There are solutions out there (https://www.lightkey.io/people-with-disabilities-feature), but they're all behind a paywall and assume nearly perfect typing. We want to open source it, and make it easily customizable to each patient.

The specific problem we're solving: 
1. Hand tremors cause adjacent keys to be hit. Our algorithm is designed with these specific errors in mind.
2. Custom dictionary input to the application to each patient
3. Repetitive key presses when patient cannot control their hand pressure or lift up fast enough
4. Relieving the grammatical burden from the patient by predicting where a space or newline is necessary 
5. Looking ahead: custom disability focused bluetooth keyboard with haptic feedback
