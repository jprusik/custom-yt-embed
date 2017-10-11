Custom YouTube Embed Generator
==============================
custom-yt-embed

## THIS VERSION OF THE TOOL IS NO LONGER MAINTAINED. THE LATEST VERSION CAN BE FOUND [HERE](https://jprusik.github.io/custom-yt-embed/index.html).

Purpose
-------
YouTube embeds are surprisingly versatile; there are numerous URL parameters to allow customization, but they can become unwieldy fast, and Google is constantly deprecating and adding tags without any kind of documentation. To solve this, I've put together this JavaScript tool which generates embed codes for any number of customization options, updated regularly with all known, working, and relevant embed parameters.

Usage
-----
To see the tool in action, you can find a working example [here](https://jprusik.github.io/custom-yt-embed/legacy/index.html). (The new version of the tool is [here](https://jprusik.github.io/custom-yt-embed/index.html).)

The `generate()` function can be called on page load, button click, or however else you wish. This will take the values from each field and parse the YouTube embed syntax accordingly.

The "Custom Parameter" field allows for parameters not supported by this tool to be easily included in the embed code output.

To change thumbnails, you must already be logged into the active video's YouTube account. Clicking the thumbnails will only bring you the relevant Video Options page, and have no functionality on their own.

Limitations/Known Issues
-----------
The Custom YouTube Embed Generator currently only generates code for YouTube's newest, preferred methodology, which uses an HTML5-friendly iframe to automatically switch to the most appropriate embedding method for the viewer. The old method used Flash only, and while it will still work, there are continually fewer reasons to use it as the iframe approach becomes more robust.

The watermark, custom preview image, Call-to-action, social media buttons, and custom frame functionalities are not officially supported by Google and are not embed parameters. As such, you may experience unexpected behavior when using these options.

The preview image does not correctly scale for IE versions earlier than 9, and will be addressed in later revisions.

Video info displays information pulled from the last valid video id, even if an invalid id is the present value.

The "HD" thumbnail link results in a error image if the queried video does not have a vertical resolution of 720 or greater.

The Pinterest button displays at a slightly lower position than other social media buttons.

The JavaScript included has NOT been thoroughly cleaned - incomplete features and features-in-development are commented out, but may be present in the source.

Author
-------
Jonathan Prusik @jprusik [www.classynemesis.com]

License
-------
Custom YouTube Embed Generator is released under the MIT License.
