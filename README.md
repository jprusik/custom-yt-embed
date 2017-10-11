Custom YouTube Embed Generator
==============================
custom-yt-embed

Purpose
-------
YouTube embeds are surprisingly versatile; there are numerous URL parameters to allow customization, but they can become unwieldy fast. To solve this, I've put together this JavaScript tool which generates embed codes for all known, working, and relevant embed parameters.

Usage
-----
To see the tool in action, you can find a working example [here](https://jprusik.github.io/custom-yt-embed/index.html). (The legacy version of the tool is [here](https://jprusik.github.io/custom-yt-embed/legacy/index.html).)

Upon option changes, the form value from each field will update the YouTube embed code and previews. An API request to [Google's YouTube data feed](https://developers.google.com/youtube/v3/) will also fire, and present additional information about the video upon a successful request.

The "Search term playlist" value will generate a playlist based on the results of a search of the term you entered.

The "On-the-fly playlist" value will generate a playlist based on comma-separated values of YouTube video ids.

Both playlist options will begin playing videos in the playlist directly after the currently active video. You can also access the playlist menu in the video embed itself.

The "Custom Parameter" field allows for parameters not supported by this tool to be easily included in the embed code output.

To change thumbnails, you must already be logged into the active video's YouTube account. Clicking the thumbnails will only bring you the relevant Video Options page, and have no functionality on their own.

Limitations/Known Issues
-----------
The Custom YouTube Embed Generator currently only generates code for YouTube's newest, preferred methodology, which uses an HTML5-friendly iframe to automatically switch to the most appropriate embedding method for the viewer. The old (now officially deprecated) method used Flash only, and while it may still work in some cases, there are continually fewer reasons to use it as the iframe embeds becomes more robust.

Author
-------
Jonathan Prusik @jprusik [www.classynemesis.com]

License
-------
Custom YouTube Embed Generator is released under the MIT License.
