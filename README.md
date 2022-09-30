#razerType

razerType is a HacktoberFest React app of a type speed illustrator.
the purpose of the app revolves around successfully calculating and displaying the typing speed and the accuracy of the user.

The typing test begins as soon as the user clicks on "Start" in the home page. 
Clicking on "Start" would route the user to the typing area which is composed of 2 text-areas, one overlapped over the other.
The one in the backdrop shall contain a "read-only placeholder" which is supposed to contain the text to be typed.
This placeholder would be fetched by a custom function which would generate a paragraph from a .json file filled with words.
The user is expected to type the words in the text-area that overlaps the prior element.
Whenever user enters a wrong character, it shall turn it's color to red else, the color shall remain the same with a higher opacity.
The moment the user types the entire paragraph, the site shall be automatically routed to the results page that displays the overall typing speed along with the accuracy of the user.
