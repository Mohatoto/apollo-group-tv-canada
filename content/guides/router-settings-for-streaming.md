---
title: Best Router Settings for Streaming TV at Home
description: The router settings that make streaming steadier, from firmware and Wi-Fi band to channel, channel width and QoS, in the order to change them.
published: 2026-11-26
updated: 2026-11-26
---
The router settings that help streaming most are, in order: current firmware, the TV on the 5 GHz band (or a cable), a clear 2.4 GHz channel (1, 6 or 11) at 20 MHz width, and Quality of Service (QoS) that gives the TV priority when the house is busy. Change one setting at a time, and run a speed test before and after each change so you keep only what helps.

This guide explains each setting in plain language, shows where router makers put it, and tells you which changes are worth your time and which rarely make a difference. It complements our guides on [Wi-Fi or Ethernet for streaming](/guides/wifi-vs-ethernet/) and [fixing buffering](/guides/fix-buffering/): those cover the cable and the quick fixes, this one covers the router itself.

**Contents**

- [The settings at a glance](#at-a-glance)
- [Before you change anything: measure](#measure)
- [1. Update the router firmware](#firmware)
- [2. Choose the right Wi-Fi band](#band)
- [3. Pick a clear channel on 2.4 GHz](#channel)
- [4. Set the channel width](#width)
- [5. Turn on QoS for the TV](#qos)
- [6. Use a guest network for visitors and gadgets](#guest)
- [7. Security settings that do not slow you down](#security)
- [Settings that rarely help](#rarely)
- [If your router came from your internet provider](#isp-router)
- [The order to make the changes](#order)
- [Frequently asked questions](#faq)

<h2 id="at-a-glance">The settings at a glance</h2>

| Setting | What to choose for streaming | Why it helps | Where it usually is |
|---|---|---|---|
| Firmware | Latest version, automatic updates on | Fixes faults and security holes | Administration, Firmware or Update |
| Wi-Fi band | 5 GHz for a TV in the same or next room; 6 GHz only if the TV supports Wi-Fi 6E | Faster at short range, less crowded | Wireless or Wi-Fi settings |
| 2.4 GHz channel | 1, 6 or 11 (whichever is least used nearby) | These three do not overlap each other | Wireless, Advanced |
| 2.4 GHz channel width | 20 MHz | Less interference with neighbours | Wireless, Advanced |
| QoS or device priority | On, with the TV or streaming box set to high priority | The TV keeps its share when others download | Advanced, QoS |
| Guest network | On, for visitors and smart-home gadgets | Keeps extra devices off your main network | Guest Network |
| Security | WPA3, or WPA2/WPA3 mixed for older devices | Protects the network without slowing streams | Wireless Security |

Menu names differ between brands and models. The examples below come from NETGEAR and TP-Link support articles; most other routers have the same settings under similar names.

<h2 id="measure">Before you change anything: measure</h2>

Router changes only make sense if you know where the problem is. Take two speed tests, and write the numbers down:

1. **At the router.** Test on a laptop connected by cable, or on a phone held right next to the router.
2. **Where you watch.** Test on the TV or streaming box itself, or on a phone held next to it.

Compare both numbers with what a stream needs. Apollo Group TV Canada lists 10 Mbps or more for HD and 25 Mbps or more for 4K. For comparison, Netflix recommends 5 Mbps or more for Full HD and 15 Mbps or more for 4K, and YouTube lists about 5 Mbps for 1080p and 20 Mbps for 4K. Our guide on [internet speed for HD and 4K](/guides/internet-speed-for-streaming/) explains how to add these up for several screens.

How to read the result:

- **Slow at the router too:** the router settings are not the cause. The connection from your provider is, so contact them. Router changes will not add speed that is not arriving.
- **Fast at the router, slow at the TV:** this is a Wi-Fi problem, and the settings below can help.
- **Fast at both, but the picture still pauses in the evening:** other devices are competing for the connection. QoS (setting 5) is the one to try.

<h2 id="firmware">1. Update the router firmware</h2>

Firmware is the router's own software. Updates fix faults that cause dropouts and close security holes. The U.S. National Security Agency's home network guidance says routers should run the latest patches, "preferably through automatic updates", and should be replaced when they reach end of life for support.

**How to do it:**

1. Open the router's app or its web page (the address is printed on the label, for example routerlogin.net on NETGEAR or tplinkwifi.net on TP-Link).
2. Find the Firmware, Update or Administration section.
3. Install any update, let the router restart, and turn on automatic updates if the option exists.

If the maker no longer releases updates for your model, that is a sign the router is due for replacement, both for security and for Wi-Fi performance.

<h2 id="band">2. Choose the right Wi-Fi band</h2>

Most routers broadcast on two bands, 2.4 GHz and 5 GHz, and newer ones add 6 GHz. The band your TV uses matters more than almost any other setting.

<figure><img src="/guides/router-settings-for-streaming/wifi-bands-compared.webp" width="1200" height="700" alt="Comparison of the 2.4 GHz, 5 GHz and 6 GHz Wi-Fi bands for a streaming TV: range, crowding, number of clear channels and device support" loading="lazy" decoding="async"><figcaption>The three Wi-Fi bands compared. Original diagram by Apollo Group TV Canada, based on TP-Link and NETGEAR support articles listed in the sources.</figcaption></figure>

| Band | Strengths | Weaknesses | Best use |
|---|---|---|---|
| 2.4 GHz | Reaches further through walls and floors | Slower and more crowded; only 3 channels that do not overlap | Far rooms, smart plugs, cameras |
| 5 GHz | Faster at short range; many more channels that do not overlap | Shorter reach than 2.4 GHz | A TV in the same room as the router or the next one |
| 6 GHz | Up to 14 channels of 80 MHz or 7 of 160 MHz, according to NETGEAR | Only devices that support Wi-Fi 6E or later can connect | Newer TVs and boxes close to a router that supports Wi-Fi 6E |

**One network name or two?** Many routers combine all bands under one name and pick the band for each device automatically. NETGEAR calls this Smart Connect and says it "automatically chooses the best WiFi band for your device". This works well for most homes. If your TV keeps landing on 2.4 GHz even though it sits close to the router, you can turn the feature off (on NETGEAR, under Wireless, clear "Enable Smart Connect") and give each band its own name. Then connect the TV to the 5 GHz name and leave phones and gadgets on whichever they prefer.

If the TV is far from the router and 5 GHz is weak there, a cable or a mesh access point near the TV usually works better than forcing 5 GHz. See [Wi-Fi or Ethernet for streaming](/guides/wifi-vs-ethernet/).

<h2 id="channel">3. Pick a clear channel on 2.4 GHz</h2>

On the 2.4 GHz band, neighbouring channels overlap. Intel's support article states that only three channels do not overlap in North America: 1, 6 and 11. TP-Link gives the same three for 20 MHz channels in the United States and advises spacing nearby networks as far apart as possible.

<figure><img src="/guides/router-settings-for-streaming/channels-2-4-ghz.webp" width="1200" height="620" alt="Diagram of the eleven 2.4 GHz Wi-Fi channels used in North America, showing how they overlap and that channels 1, 6 and 11 do not overlap each other" loading="lazy" decoding="async"><figcaption>2.4 GHz channels overlap; 1, 6 and 11 do not. Original diagram by Apollo Group TV Canada, based on Intel and TP-Link support articles.</figcaption></figure>

**How to choose:**

1. Leave the channel on Auto first. Most routers pick a reasonable one.
2. If the 2.4 GHz connection is still unsteady, find out which channels nearby networks use. A free Wi-Fi analyser app on a phone or laptop shows this.
3. Set your 2.4 GHz channel to whichever of 1, 6 or 11 is least busy. Avoid channels in between (for example 3 or 8), because they overlap two of the clear ones at once.
4. Test again from where you watch.

On 5 GHz there are many more channels, so Auto is usually best. TP-Link notes that some 5 GHz channels require DFS, a rule that exists so Wi-Fi does not interfere with radar systems. If your 5 GHz network drops briefly now and then while it sits on one of those channels, trying a channel outside the DFS range is a reasonable test.

<h2 id="width">4. Set the channel width</h2>

Channel width is how much of the band one network uses: 20, 40, 80 or 160 MHz. Wider channels carry more data, but TP-Link explains that they use more of the available spectrum and are more exposed to interference. TP-Link describes 20 MHz as the standard width that balances speed and stability.

| Band | Suggested width | Reason |
|---|---|---|
| 2.4 GHz | 20 MHz | Only three channels fit without overlap at 20 MHz; wider settings crowd neighbours and pick up more interference |
| 5 GHz | Auto or 80 MHz; try 40 MHz if the signal is unsteady | Room for wide channels, but narrower is steadier in a crowded building |
| 6 GHz | Auto | The band has room for wide channels (14 at 80 MHz) |

A stream needs far less than a wide channel can carry: even 4K needs about 15 to 25 Mbps according to the figures above. So in an apartment building with many networks, a narrower and steadier channel often gives a better picture than a wider and faster one that keeps dropping.

<h2 id="qos">5. Turn on QoS for the TV</h2>

Quality of Service (QoS) tells the router which traffic to serve first when the connection is full. It does not add speed. It only decides who waits. That makes it useful in one situation: the picture pauses when someone else in the house is downloading, uploading or gaming, even though speed tests look fine.

**On a NETGEAR Nighthawk** (models R6700, R6900, R7000), NETGEAR's steps are:

1. Log in at routerlogin.net.
2. Go to ADVANCED, then Setup, then QoS Setup, and open the Downstream QoS tab.
3. Tick "Enable Downstream QoS (Improved Video Streaming)" and click Apply.

NETGEAR notes that this lowers the priority of other traffic, so downloads may take longer, and recommends it only if you watch streaming video.

**On a TP-Link router**, TP-Link's steps depend on the model. On many models, go to Advanced, then QoS, then Device Priority, set the total bandwidth (the router can measure it with its own speed test), and switch Priority on for the TV. In the Tether app, the same option is under HomeCare, then QoS, on routers that have HomeCare.

**Tips that make QoS work:**

- **Prioritise one to three devices, not everything.** T-Mobile's guide on device priority makes the same point: if every device is high priority, none is.
- **Enter a bandwidth slightly below your measured speed** if the router asks for it. How-To Geek suggests 80 to 95% of the speed test result, so the router has room to manage traffic.
- **Use timed priority** if your router offers it, for example the evening hours when you watch.
- **Test with and without QoS.** If nothing changes, turn it off again; on a connection with plenty of spare speed it has nothing to manage.

<h2 id="guest">6. Use a guest network for visitors and gadgets</h2>

A guest network is a second Wi-Fi name that is kept separate from your main devices. The NSA guidance recommends one for visitors, to keep their devices away from more trusted ones. For streaming, it has a side benefit: you can move visitors' phones and smart-home gadgets off the network your TV uses, which keeps your main network simpler to manage and makes QoS rules easier to set.

Most routers offer it under a Guest Network or Guest Wi-Fi menu. Turn it on, give it its own password, and connect visitors and gadgets to it.

<h2 id="security">7. Security settings that do not slow you down</h2>

Security settings do not cost streaming speed, so there is no reason to weaken them:

- **Encryption:** use WPA3. If some older devices cannot connect, the NSA guidance suggests the WPA2/WPA3 mixed mode, and a Wi-Fi password of at least twenty characters.
- **Router login:** change the default admin password. NETGEAR's own article shows the factory login is admin and password on its routers, which is why it must be changed.
- **Remote management and UPnP:** the NSA guidance recommends turning off remote administration and Universal Plug and Play. If an app or game stops working after you turn UPnP off, check your router maker's help pages for the specific port setting it needs instead.

<h2 id="rarely">Settings that rarely help</h2>

Some changes are popular in forums but seldom fix streaming:

- **Changing DNS servers.** DNS turns names into addresses when a connection starts; it does not carry the video. Switching DNS can change how fast a page or app starts, but it does not raise the speed of a stream that is already playing.
- **Turning every setting to maximum.** The widest channel, the highest power and every "turbo" mode do not add up to a steadier picture, especially in a crowded building. Steady beats fast for live TV.
- **Restarting the router every day.** An occasional restart clears faults, as our [buffering guide](/guides/fix-buffering/) explains, but a daily restart does not improve a healthy router.
- **Basic Wi-Fi extenders.** They can help in a weak room, but a mesh system or a cable is usually more reliable.

<h2 id="isp-router">If your router came from your internet provider</h2>

Many households in Canada and the US use a modem-router combo supplied by their internet provider. These usually have the same settings, but some are moved into the provider's app or locked. Look in the provider's app first under Wi-Fi or Advanced settings, and check the provider's help pages for your model before changing anything. If a setting such as the channel or band split is not available, a separate router or mesh system connected to the provider's equipment is the usual way around it; ask your provider how to set their equipment for that.

<h2 id="order">The order to make the changes</h2>

<figure><img src="/guides/router-settings-for-streaming/router-settings-order.webp" width="1200" height="900" alt="Flowchart of eight steps for changing router settings for streaming, from measuring speed and updating firmware to choosing a band, channel, width, QoS and a guest network, then measuring again" loading="lazy" decoding="async"><figcaption>Work through the settings in this order and test after each one. Original diagram by Apollo Group TV Canada.</figcaption></figure>

1. **Measure** at the router and where you watch, and write down both numbers.
2. **Update the firmware** and turn on automatic updates.
3. **Put the TV on 5 GHz**, or on a cable if it is far from the router.
4. **On 2.4 GHz only, pick channel 1, 6 or 11**, whichever is least used nearby.
5. **Keep 2.4 GHz at 20 MHz width**, and try a narrower 5 GHz width if that band is unsteady.
6. **Turn on QoS** for the TV if pauses happen when others use the connection.
7. **Move guests and gadgets** to a guest network.
8. **Measure again** from where you watch, and keep only the changes that helped.

Change one thing at a time. If you change five settings at once and the picture gets worse, you will not know which one to undo.

**Common mistakes to avoid:**

- Changing settings before measuring, so there is nothing to compare with.
- Forcing a TV onto 5 GHz in a room where that band is weak.
- Prioritising every device in QoS.
- Picking channels between 1, 6 and 11 on 2.4 GHz.
- Expecting router settings to fix a slow connection from the provider.

Router settings are only one part of a steady picture. If you share one account across several screens, see [using one account on up to 5 devices](/guides/five-devices-one-account/) for how to plan the speed for a whole household.

<span id="faq"></span>

## Frequently asked questions

### What is the best router setting for streaming?

For most homes, the biggest single gain is putting the TV on the 5 GHz band, or on an Ethernet cable, and keeping the router firmware up to date. QoS helps after that, but only when other devices compete for the connection.

### Should I use 2.4 GHz or 5 GHz for my TV?

Use 5 GHz when the TV is in the same room as the router or the next one, because it is faster at short range and less crowded. Use 2.4 GHz only if 5 GHz is too weak where the TV is, and consider a cable or mesh access point instead.

### Does QoS make my internet faster?

No. QoS does not add speed; it decides which device is served first when the connection is full. It helps when the picture pauses during other people's downloads or games, and does nothing when there is plenty of spare speed.

### What channel should I use for 2.4 GHz?

Use 1, 6 or 11, whichever is least used by nearby networks. Intel and TP-Link both list these three as the channels that do not overlap each other in North America.

### Will changing my DNS stop buffering?

Rarely. DNS only looks up addresses when a connection starts and does not carry the video, so it does not change the speed of a stream that is already playing. Check your Wi-Fi band, signal and QoS first.

## Sources

All sources were opened on 26 November 2026.

- Netflix Help Center: [Internet connection speed recommendations](https://help.netflix.com/en/node/306)
- YouTube Help: [System requirements, recommended sustained speeds](https://support.google.com/youtube/answer/78358)
- U.S. National Security Agency: [Best Practices for Securing Your Home Network](https://media.defense.gov/2023/Feb/22/2003165170/-1/-1/0/CSI_BEST_PRACTICS_FOR_SECURING_YOUR_HOME_NETWORK.PDF) (February 2023)
- Intel Support: [Wireless device interference may impact 802.11n](https://www.intel.com/content/www/us/en/support/articles/000006529.html) (last reviewed 28 October 2021)
- TP-Link Support: [Wi-Fi channels, channel width and interference](https://www.tp-link.com/us/support/faq/4309/) (updated 12 November 2024)
- TP-Link Support: [How to set up QoS on a TP-Link Wi-Fi router](https://www.tp-link.com/ec/support/faq/2693) (updated 14 May 2026)
- NETGEAR Support: [Optimize video streaming with Downstream QoS on a Nighthawk router](https://kb.netgear.com/23853/How-do-I-optimize-video-streaming-performance-with-downstream-quality-of-service-on-my-Nighthawk-router) (updated 7 July 2025)
- NETGEAR Support: [What is Smart Connect and how to enable or disable it](https://kb.netgear.com/25346/What-is-Smart-Connect-and-how-do-I-enable-or-disable-it-on-my-Nighthawk-router) (updated 7 July 2025)
- NETGEAR Support: [What is WiFi 6E?](https://kb.netgear.com/000062798/What-is-WiFi-6E) (updated 7 July 2025)
- T-Mobile: [How to prioritize devices on Wi-Fi](https://www.t-mobile.com/home-internet/the-signal/internet-help/how-to-prioritize-devices-on-wifi) (November 2025)
- How-To Geek: [How to use Quality of Service (QoS) on your router](https://www.howtogeek.com/75660/the-beginners-guide-to-qos-on-your-router)
