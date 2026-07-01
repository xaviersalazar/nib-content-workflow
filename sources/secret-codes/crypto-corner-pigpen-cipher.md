[Crypto Corner](https://crypto.interactive-maths.com/)

- [Home](https://crypto.interactive-maths.com/)
- [Introduction to Cryptography](https://crypto.interactive-maths.com/introduction-to-cryptography.html)
- [Monoalphabetic Substitution Ciphers](https://crypto.interactive-maths.com/monoalphabetic-substitution-ciphers.html)
- [Simple Transposition Ciphers](https://crypto.interactive-maths.com/simple-transposition-ciphers.html)
- [Polyalphabetic Substitution Ciphers](https://crypto.interactive-maths.com/polyalphabetic-substitution-ciphers.html)
- [Fractionating Ciphers](https://crypto.interactive-maths.com/fractionating-ciphers.html)
- [Digraph Substitution Ciphers](https://crypto.interactive-maths.com/digraph-substitution-ciphers.html)

## Pigpen Cipher

**[Cipher Activity](https://crypto.interactive-maths.com/pigpen-cipher.html#act)**
**[Introduction](https://crypto.interactive-maths.com/pigpen-cipher.html#intro)**
**[Encryption](https://crypto.interactive-maths.com/pigpen-cipher.html#encrypt)**
**[Decryption](https://crypto.interactive-maths.com/pigpen-cipher.html#decrypt)**
**[Discussion](https://crypto.interactive-maths.com/pigpen-cipher.html#disc)**
**[Exercise](https://crypto.interactive-maths.com/pigpen-cipher.html#ex)**

[![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/cc-logo_orig.jpg)](http://crypto.interactive-maths.com/)

Alphabet:

Plaintext:

Slow Encrypt

Ciphertext:

Slow Decrypt

Decipher Tool:

|     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/3828467_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/8565785_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/5793502_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/405493_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/5315627_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/3069397_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/9732727_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/2206334_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/5436202_orig.gif) |
| ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/531725_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/7619_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/1544996_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/6407002_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/1752433_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/3990919_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/9153193_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/9245542.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/5876277_orig.gif) |
| ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/8339782_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/9740279_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/3051931_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/1037786_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/6201963_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/6331941_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/5302584_orig.gif) | ![](http://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/5373597_orig.gif) |

Options:

Remove all Characters not in alphabet

Put ciphertext in blocks of 5

Crypto Corner © Daniel Rodriguez-Clark 2017

The Pigpen Cipher is another example of a substitution cipher, but rather than replacing each letter with another letter, the letters are replaced by symbols. The cipher has an interesting history: although its true origins are unknown, it has been used by many groups. Most notoriously, it was the cipher of choice for use by the Freemasons, a secret society in the 18th Century. In fact, they used it so much, that it is often referred to as the Freemasons Cipher. However, it was not exclusively used by them, with Union prisoners in Confederate camps using it to communicate in the American Civil War.

**Encryption**

The encryption process is fairly straightforward, replacing each occurence of a letter with the designated symbol. The symbols are assigned to the letters using the key shown below, where the letter shown is replaced by the part of the image in which it is located.

|     |     |
| --- | --- |
| ![Picture](https://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/8059746_orig.gif) <br>The key to the Pigpen Cipher is this easy to remember grid system. Letters are represented by the part of the grid they are in. | |     |     |
| --- | --- |
| ![Picture](https://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/6480339_orig.gif) | represents "A" |

|     |     |
| --- | --- |
| ![Picture](https://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/5959729_orig.gif) | represents "M" |

|     |     |
| --- | --- |
| ![Picture](https://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/2159533_orig.gif) | represents "T" |

|     |     |
| --- | --- |
| ![Picture](https://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/309888_orig.gif) | represents "W" | |

**Decryption**

The decryption process is just the reverse of the encryption process. Using the same key (the grid above), you locate the image depicted in the ciphertext, and replace it with the letter given by that part of the grid.

**Discussion**

The Pigpen Cipher was used by the Freemasons in many aspects of their lives, and one of the most common still seen today is on gravestones. Below is an image of a gravestone which clearly contains the use of the Pigpen Cipher.

|     |     |
| --- | --- |
| ![Picture](https://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/2408837_orig.gif) <br>A grave with Pigpen cipher symbols on. | ![Picture](https://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/7978747_orig.gif) <br>A close up of the grave to the left, showing clearly the use of symbols.<br>Notice that at the top of the gravestone, there is the symbol of a pair of compasses, one of the symbols of the Freemasons. The inscription appears to read "Thomas Brierley made his ingress July 16th 1785", which is thought to mean that he joined the Freemasons on this date. |

There are many possible variation of the Pigpen Cipher (even in the example above, the symbol for "s" is not standard). The most common variants include changing the order from grid, grid, X, X to grid, X, grid, X (as shown below) or even placing the letters alternately into the grids (as used in the game "Assassin's Creed II").

|     |     |
| --- | --- |
| ![Picture](https://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/7517089_orig.gif) <br>This variant uses a Grid, X, Grid, X layout to position the letters. | [![Picture](https://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/8413698.png?254)](https://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/8413698_orig.png) <br>This variant places the letters alternately in the dot and non-dot parts to split adjacent letters. |

One final method for changing the Pigpen Cipher slightly is to use three grids, and using either a full stop, or space, to occupy the last position. An example of this is given below.

![Picture](https://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/2515344_orig.gif)

Another variant, using three grids this time. There is a final symbol, which can be used for spaces or full stops

**Questions**

Use the standard Pigpen Cipher to decrypt these mathematical words.

![Picture](https://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/358986_orig.gif)

![Picture](https://crypto.interactive-maths.com/uploads/1/1/3/4/11345755/7999205_orig.gif)

* * *

|     |     |
| --- | --- |
| [Previous Page: Atbash Cipher](https://crypto.interactive-maths.com/atbash-cipher.html) | [Next Page: Shift Cipher](https://crypto.interactive-maths.com/caesar-shift-cipher.html) |

- [Home](https://crypto.interactive-maths.com/)


  - [Crypto Corner Challenges](https://crypto.interactive-maths.com/challenge.html)
  - [Glossary](https://crypto.interactive-maths.com/glossary.html)
  - [Help with Activities](https://crypto.interactive-maths.com/help-with-activities.html)
  - [Educational Uses](https://crypto.interactive-maths.com/educational-uses.html)
  - [Downloadable Resources](https://crypto.interactive-maths.com/downloadable-resources.html)

- [Introduction to Cryptography](https://crypto.interactive-maths.com/introduction-to-cryptography.html)


  - [Steganography](https://crypto.interactive-maths.com/steganography.html)
  - [Codes and Ciphers](https://crypto.interactive-maths.com/codes-and-ciphers.html)
  - [Conventions in Cryptography](https://crypto.interactive-maths.com/conventions-in-cryptography.html)

- [Monoalphabetic Substitution Ciphers](https://crypto.interactive-maths.com/monoalphabetic-substitution-ciphers.html)


  - [Atbash Cipher](https://crypto.interactive-maths.com/atbash-cipher.html)
  - [Pigpen Cipher](https://crypto.interactive-maths.com/pigpen-cipher.html)
  - [Caesar Shift Cipher](https://crypto.interactive-maths.com/caesar-shift-cipher.html)
  - [Affine Cipher](https://crypto.interactive-maths.com/affine-cipher.html)
  - [Mixed Alphabet Cipher](https://crypto.interactive-maths.com/mixed-alphabet-cipher.html)
  - [Other Examples](https://crypto.interactive-maths.com/other-examples1.html)
  - [Frequency Analysis: Breaking the Code](https://crypto.interactive-maths.com/frequency-analysis-breaking-the-code.html)
  - [Homophonic Substitution](https://crypto.interactive-maths.com/homophonic-substitution.html)

- [Simple Transposition Ciphers](https://crypto.interactive-maths.com/simple-transposition-ciphers.html)


  - [Rail Fence Cipher](https://crypto.interactive-maths.com/rail-fence-cipher.html)
  - [Route Cipher](https://crypto.interactive-maths.com/route-cipher.html)
  - [Columnar Transposition Cipher](https://crypto.interactive-maths.com/columnar-transposition-cipher.html)
  - [Myszkowski Transposition Cipher](https://crypto.interactive-maths.com/myszkowski-transposition-cipher.html)
  - [Permutation Cipher](https://crypto.interactive-maths.com/permutation-cipher.html)
  - [Anagramming: Jumbling words](https://crypto.interactive-maths.com/anagramming-jumbling-words.html)
  - [Combining Monoalphabetic and Simple Transposition Ciphers](https://crypto.interactive-maths.com/combining-monoalphabetic-and-simple-transposition-ciphers.html)

- [Polyalphabetic Substitution Ciphers](https://crypto.interactive-maths.com/polyalphabetic-substitution-ciphers.html)


  - [Vigenère Cipher](https://crypto.interactive-maths.com/vigenegravere-cipher.html)
  - [Kasiski Analysis: Breaking the Code](https://crypto.interactive-maths.com/kasiski-analysis-breaking-the-code.html)
  - [Autokey Cipher](https://crypto.interactive-maths.com/autokey-cipher.html)
  - [Other Examples](https://crypto.interactive-maths.com/other-examples.html)

- [Fractionating Ciphers](https://crypto.interactive-maths.com/fractionating-ciphers.html)


  - [Polybius Square](https://crypto.interactive-maths.com/polybius-square.html)
  - [Straddling Checkerboard](https://crypto.interactive-maths.com/straddling-checkerboard.html)
  - [Transposing Fractionated Text](https://crypto.interactive-maths.com/transposing-fractionated-text.html)
  - [Other ways to Alter Fractionated Text](https://crypto.interactive-maths.com/other-ways-to-alter-fractionated-text.html)

- [Digraph Substitution Ciphers](https://crypto.interactive-maths.com/digraph-substitution-ciphers.html)


  - [Playfair Cipher](https://crypto.interactive-maths.com/playfair-cipher.html)
  - [Two-Square Cipher](https://crypto.interactive-maths.com/two-square-cipher.html)
  - [Four-Square Cipher](https://crypto.interactive-maths.com/four-square-cipher.html)
  - [Hill Cipher](https://crypto.interactive-maths.com/hill-cipher.html)

- [Crypto Corner Challenges](https://crypto.interactive-maths.com/challenge.html)
- [Glossary](https://crypto.interactive-maths.com/glossary.html)
- [Help with Activities](https://crypto.interactive-maths.com/help-with-activities.html)
- [Educational Uses](https://crypto.interactive-maths.com/educational-uses.html)
- [Downloadable Resources](https://crypto.interactive-maths.com/downloadable-resources.html)

- [Steganography](https://crypto.interactive-maths.com/steganography.html)
- [Codes and Ciphers](https://crypto.interactive-maths.com/codes-and-ciphers.html)
- [Conventions in Cryptography](https://crypto.interactive-maths.com/conventions-in-cryptography.html)

- [Atbash Cipher](https://crypto.interactive-maths.com/atbash-cipher.html)
- [Pigpen Cipher](https://crypto.interactive-maths.com/pigpen-cipher.html)
- [Caesar Shift Cipher](https://crypto.interactive-maths.com/caesar-shift-cipher.html)
- [Affine Cipher](https://crypto.interactive-maths.com/affine-cipher.html)
- [Mixed Alphabet Cipher](https://crypto.interactive-maths.com/mixed-alphabet-cipher.html)
- [Other Examples](https://crypto.interactive-maths.com/other-examples1.html)
- [Frequency Analysis: Breaking the Code](https://crypto.interactive-maths.com/frequency-analysis-breaking-the-code.html)
- [Homophonic Substitution](https://crypto.interactive-maths.com/homophonic-substitution.html)

- [Rail Fence Cipher](https://crypto.interactive-maths.com/rail-fence-cipher.html)
- [Route Cipher](https://crypto.interactive-maths.com/route-cipher.html)
- [Columnar Transposition Cipher](https://crypto.interactive-maths.com/columnar-transposition-cipher.html)
- [Myszkowski Transposition Cipher](https://crypto.interactive-maths.com/myszkowski-transposition-cipher.html)
- [Permutation Cipher](https://crypto.interactive-maths.com/permutation-cipher.html)
- [Anagramming: Jumbling words](https://crypto.interactive-maths.com/anagramming-jumbling-words.html)
- [Combining Monoalphabetic and Simple Transposition Ciphers](https://crypto.interactive-maths.com/combining-monoalphabetic-and-simple-transposition-ciphers.html)

- [Vigenère Cipher](https://crypto.interactive-maths.com/vigenegravere-cipher.html)
- [Kasiski Analysis: Breaking the Code](https://crypto.interactive-maths.com/kasiski-analysis-breaking-the-code.html)
- [Autokey Cipher](https://crypto.interactive-maths.com/autokey-cipher.html)
- [Other Examples](https://crypto.interactive-maths.com/other-examples.html)

- [Polybius Square](https://crypto.interactive-maths.com/polybius-square.html)
- [Straddling Checkerboard](https://crypto.interactive-maths.com/straddling-checkerboard.html)
- [Transposing Fractionated Text](https://crypto.interactive-maths.com/transposing-fractionated-text.html)
- [Other ways to Alter Fractionated Text](https://crypto.interactive-maths.com/other-ways-to-alter-fractionated-text.html)

- [Playfair Cipher](https://crypto.interactive-maths.com/playfair-cipher.html)
- [Two-Square Cipher](https://crypto.interactive-maths.com/two-square-cipher.html)
- [Four-Square Cipher](https://crypto.interactive-maths.com/four-square-cipher.html)
- [Hill Cipher](https://crypto.interactive-maths.com/hill-cipher.html)

![Buy Me a Coffee](https://cdn.buymeacoffee.com/widget/assets/coffee%20cup.svg)

Thanks for visiting Crypto Corner! You can support the site here.