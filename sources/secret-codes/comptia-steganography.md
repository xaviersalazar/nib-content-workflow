Quick links

# The Ancient Practice of Steganography: What is it, How is it Used and Why Do Cybersecurity Pros Need to Understand it?

[Cyber](https://www.comptia.org/en-us/search-page/?query=&categories=Cyber) [CySA+](https://www.comptia.org/en-us/search-page/?query=&categories=CySA%2b)

November 13, 2024James Stanger

One of the first things I remember doing as a kid was writing secret messages to friends using invisible ink. I was only about 8 or 9 then, so I used the tools my mom unwittingly made available: Lemon juice and an iron. I wrote my secret message on a piece of paper and then told my friend to use an iron or even a match—some sort of heat source—to burn the lemon juice a bit, turning it brown. This revealed the secret message I wanted to share. Have you ever done that yourself? Well, if you have, you and I have engaged in the time-honored practice of steganography.

![blog_what-is-steganography.jpg](https://images2.cmp.optimizely.com/Zz1kMmZiMzU3MDlhZDIxMWVmOTdkYTFhZTJjOWExYWVkZA==)

## What is steganography?

Steganography is the practice of hiding a secret message inside of (or even on top of) something that is not secret. That something can be just about anything you want. These days, many examples of steganography involve embedding a secret piece of text inside of a picture. Or hiding a secret message or script inside of a Word or Excel document.

The purpose of steganography is to conceal and deceive. It is a form of covert communication that can involve using any medium to hide messages. It’s not a form of cryptography because it doesn’t involve scrambling data or using a key. Instead, it is a form of data hiding and can be executed in clever ways. Where cryptography is a science that largely enables privacy, steganography is a practice that enables secrecy—and deceit.

## How steganography is used today

Steganography has been used for centuries, but these days, hackers and IT pros have digitized it to do some pretty creative things. There are a number of apps that can be used for steganography, including Steghide, Xiao, Stegais and Concealment.

The word steganography seems fancy, but it comes from a fairly normal place. The root “steganos” is Greek for “hidden” or “covered,” and the root “graph” is Greek for “to write.” Put these words together, and you’ve got something close to “hidden writing” or “secret writing.”

Here’s an example of how digital steganography works. A friend of mine sent me a steganographic message—a secret message embedded within an image. The image was a photo that I had previously sent him of a geyser I had paddled to while on Yellowstone Lake last summer.

![figure_1](https://comptiacdn.azureedge.net/webcontent/images/default-source/blogs/figure_19f89449d165247a8a3c713076e9f0784.jpg?sfvrsn=cd7b553c_6)

To embed his secret message to me, my friend then issued the commands shown in Figure 2.

![figure_3](https://comptiacdn.azureedge.net/webcontent/images/default-source/blogs/figure_333335b16f2ae4a9d81e95fc31951a153.jpg?sfvrsn=da803777_10)

With my own copy of Steghide (available in Windows, Linux and Mac), I used the command sequence shown in Figure 3 to extract that secret message. I then read it using the cat command.

![figure_2](https://comptiacdn.azureedge.net/webcontent/images/default-source/blogs/figure_2840eece5d38b49fb858b741658b668c1.jpg?sfvrsn=fc4ff3a4_8)

Apparently, my friend is a fan of the classic movie _[Christmas Stor](https://www.imdb.com/title/tt0085334/ "") y_ and somehow felt the need to repeat Little Orphan Annie’s reminder for us all to keep up with our nutrition: “Be sure to drink your Ovaltine.”

This is a trivial example of how steganography has been used over the decades. But over time, penetration testers and attackers alike have been using steganography to do more than share messages.

## Using steganography to deliver attacks

Today, attackers and pen testers use PowerShell and BASH scripts to automate attacks. For example, attackers have been embedding actual scripts within macro-enabled Excel and Word documents. Once a victim opens the Excel or Word document, they activate the embedded secret script.

The attacker doesn’t need to trick users into using applications such as Steghide. In this case, the hacker—or pen tester—is “living off the land.” The attacker is using a steganographic application to take advantage of common Windows applications and features such as Excel and PowerShell. All the victim needs to do is read the doc, and an unfortunate series of events begins to occur.

1. First, the victim clicks on an Excel document that an attacker has modified using steganography.
2. That click unleashes a hidden PowerShell script.
3. This script then installs an installer app into the Windows computer. This installer app moves quickly and is so subtle that typical antivirus applications don’t notice it.
4. This downloader then goes out to the internet and grabs updated versions of malware such as URLZone (or more recent tools) that then compromise the victim’s computer.

Over the years, attackers have used the procedure above to deliver ransomware such as Snatch. Hackers have installed sophisticated malware that is cable of keylogging, enlisting computers into DDoS botnets or installing trojans, such as the latest variants of [Rovnix](https://www.atmia.com/news/rovnix-bootkit-returns-during-pandemic-with-new-features/13418/ "") and [Pillowmint](https://summit.fireeye.com/content/dam/fireeye-www/summit/cds-2018/presentations/cds18-technical-s05-att&cking-fin7.pdf ""). The list goes on.

## Artificial intelligence and steganography

We’re also seeing attackers add artificial intelligence (AI) into the mix. Increasingly, we’re seeing AI uses of various tactics, including steganography, to hide information. AI implementations have even been able to modify steganographic techniques so that attacks can’t be easily discovered.

## Detecting steganography

[Security analysts](https://www.comptia.org/en-us/explore-careers/job-roles/cybersecurity-analyst/) work to identify the tactics, techniques, and procedures (TTPs) of attackers and pen testers. Over the years, they have identified typical signatures that steganographic applications use. This is why antivirus applications, for example, can identify typical moves made by steganographic applications.

Therefore, pen testers and attackers morph and modify their procedures to thwart detection. And so the cat and mouse game continues: Attackers constantly modify tools and techniques, and security analysts constantly look for new signatures and methods.

**_CompTIA Cybersecurity Analyst (CySA+) validates the skills needed by cybersecurity analysts, including steganography. [Download the exam objectives](https://www.comptia.org/en-us/certifications/cybersecurity-analyst/v3/#objectives) for free to see what skills you need to be a cybersecurity analyst._**

a26330300728.cdn.optimizely.com

# a26330300728.cdn.optimizely.com is blocked

This page has been blocked by an extension

- Try disabling your extensions.

ERR\_BLOCKED\_BY\_CLIENT

Reload


This page has been blocked by an extension

![](<Base64-Image-Removed>)![](<Base64-Image-Removed>)