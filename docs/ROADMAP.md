# bleed feature roadmap

Inventory of everything documented at <https://docs.bleed.bot>, generated from the docs index, used to track what this bot implements.

**Currently implemented:** `antinuke` (full), `uptime`.

| Module | Documented commands | Status |
|---|---|---|
| **Customization** (overview) | 6 | not started |
| **Donator Perks** (overview) | 12 | not started |
| **Antinuke** (security) | 18 | done |
| **Fake Permissions** (security) | 4 | not started |
| **Honeypot** (security) | 3 | not started |
| **Join Gate** (security) | 9 | not started |
| **Moderation** (security) | 3 | not started |
| **Auto Messages** (configuration) | 3 | not started |
| **Auto Responders** (configuration) | 7 | not started |
| **Blacklist & Access** (configuration) | 4 | not started |
| **Booster Roles** (configuration) | 7 | not started |
| **Bump Reminder** (configuration) | 8 | not started |
| **Button Roles** (configuration) | 4 | not started |
| **Command Aliases** (configuration) | 11 | not started |
| **Level Rewards** (configuration) | 11 | not started |
| **Logging** (configuration) | 3 | not started |
| **Reaction Roles** (configuration) | 3 | not started |
| **Reaction Triggers** (configuration) | 8 | not started |
| **Starboard** (configuration) | 14 | not started |
| **System Messages** (configuration) | 3 | not started |
| **VoiceMaster** (configuration) | 12 | not started |
| **Counters** (miscellaneous) | 3 | not started |
| **Giveaway** (miscellaneous) | 14 | not started |
| **Music** (miscellaneous) | 12 | not started |
| **Webhook** (miscellaneous) | 6 | not started |
| **Fortnite** (integrations) | 6 | not started |
| **Social Notifications** (integrations) | 6 | not started |
| **Spotify** (integrations) | 5 | not started |
| **Pagination** (resources) | 3 | not started |
| **Syntax** (resources) | 1 | not started |
| **Permissions** (common-issues) | 1 | not started |

**Total: 210 documented command forms across 31 modules.**

---

## Overview

### Customization

Customize bleed's avatar, banner, and bio.

- `,customize avatar`
- `,customize avatar https`
- `,customize banner`
- `,customize banner https`
- `,customize bio`
- `,customize bio bryce is`

### Donator Perks

Donator perks are rewards given to those who choose to donate to Bleed.

- `,chatgpt`
- `,chatgpt am i cute`
- `,instagram add`
- `,lastfm cr`
- `,lastfm mode`
- `,makegif`
- `,makegif https`
- `,prefix self`
- `,prefix self j`
- `,transparent`
- `,transparent https`
- `,voicemaster ghost`

## Security

### Antinuke

Impose restrictions on moderators to prevent destructive behavior.

- `,antinuke admin`
- `,antinuke ban`
- `,antinuke ban on`
- `,antinuke botadd`
- `,antinuke botadd on`
- `,antinuke channel`
- `,antinuke channel on`
- `,antinuke emoji`
- `,antinuke emoji on`
- `,antinuke kick`
- `,antinuke kick on`
- `,antinuke role`
- `,antinuke role on`
- `,antinuke vanity`
- `,antinuke vanity on`
- `,antinuke webhook`
- `,antinuke webhook on`
- `,antinuke whitelist`

### Fake Permissions

Restrict moderators to only use bleed for moderation.

- `,fakepermissions add`
- `,fakepermissions grant`
- `,fakepermissions list`
- `,fakepermissions remove`

### Honeypot

Catch compromised accounts sending malicious messages.

- `,honeypot add`
- `,honeypot list`
- `,honeypot remove`

### Join Gate

Prevent automated accounts from joining your server.

- `,antiraid age`
- `,antiraid age on`
- `,antiraid avatar`
- `,antiraid avatar on`
- `,antiraid massjoin`
- `,antiraid massjoin on`
- `,antiraid whitelist`
- `,raid`
- `,recentban`

### Moderation

Guide to setting up moderation commands in your server.

- `,invoke`
- `,invoke jail dm you`
- `,invoke jail message`

## Configuration

### Auto Messages

Schedule messages to be sent at an interval.

- `,timer add`
- `,timer remove`
- `,timer view`

### Auto Responders

Automatically respond to trigger messages.

- `,autoresponder add`
- `,autoresponder add welc`
- `,autoresponder exclusive`
- `,autoresponder remove`
- `,autoresponder remove welc`
- `,autoresponder role`
- `,autoresponder role add`

### Blacklist & Access

Control who can open tickets and manage manual attendees.

- `,tickets allow`
- `,tickets allow list`
- `,tickets blacklist`
- `,tickets deny`

### Booster Roles

Reward your boosters with unique roles for themselves.

- `,boosterrole`
- `,boosterrole award`
- `,boosterrole base`
- `,boosterrole icon`
- `,boosterrole icon https`
- `,boosterrole rename`
- `,boosterrole rename boss role`

### Bump Reminder

Receive reminders to bump your server on DISBOARD.

- `,bumpreminder autoclean`
- `,bumpreminder autoclean on`
- `,bumpreminder autolock`
- `,bumpreminder autolock on`
- `,bumpreminder channel`
- `,bumpreminder message`
- `,bumpreminder thankyou`
- `,bumpreminder thankyou thank you`

### Button Roles

Allow your members to assign themselves roles by clicking a button.

- `,buttonrole add`
- `,buttonrole remove`
- `,buttonrole removeall`
- `,buttonrole reset`

### Command Aliases

Create shortcuts to invoke other commands.

- `,alias add`
- `,alias add deport ban`
- `,alias add pic role`
- `,alias add shh timeout`
- `,alias remove`
- `,alias remove deport`
- `,alias view`
- `,alias view deport`
- `,ban`
- `,pic`
- `,shh`

### Level Rewards

Reward your members for being active in your server.

- `,levels add`
- `,levels ignore`
- `,levels message`
- `,levels messagemode`
- `,levels messagemode pm`
- `,levels remove`
- `,levels setrate`
- `,levels stackroles`
- `,levels stackroles off`
- `,setlevel`
- `,setxp`

### Logging

Log events in your server.

- `,log add`
- `,log ignore`
- `,log remove`

### Reaction Roles

Allow your members to assign themselves roles by reacting to a message.

- `,reactionrole add`
- `,reactionrole remove`
- `,reactionrole removeall`

### Reaction Triggers

Automatically react to trigger messages.

- `,reaction`
- `,reaction add`
- `,reaction messages`
- `,reaction owner`
- `,reaction owner jon`
- `,reaction remove`
- `,reaction removeall`
- `,reaction removeall jon`

### Starboard

Allow members to repost interesting messages to a starboard channel.

- `,starboard attachments`
- `,starboard attachments false`
- `,starboard color`
- `,starboard color pink`
- `,starboard emoji`
- `,starboard ignore`
- `,starboard jumpurl`
- `,starboard jumpurl false`
- `,starboard selfstar`
- `,starboard selfstar true`
- `,starboard set`
- `,starboard threshold`
- `,starboard timestamp`
- `,starboard timestamp false`

### System Messages

Automatically send messages when certain member events occur.

- `,welcome add`
- `,welcome remove`
- `,welcome view`

### VoiceMaster

Create temporary voice channels which can be customized to your liking.

- `,voicemaster category`
- `,voicemaster default bitrate`
- `,voicemaster default name`
- `,voicemaster default region`
- `,voicemaster default region russia`
- `,voicemaster join role`
- `,voicemaster limit`
- `,voicemaster permit`
- `,voicemaster rename`
- `,voicemaster rename ethan`
- `,voicemaster role`
- `,voicemaster transfer`

## Miscellaneous

### Counters

Create counters in your server

- `,counter add`
- `,counter add members vc`
- `,counter remove`

### Giveaway

Easily create events where members can win prizes.

- `,giveaway cancel`
- `,giveaway edit description`
- `,giveaway edit duration`
- `,giveaway edit host`
- `,giveaway edit image`
- `,giveaway edit maxlevel`
- `,giveaway edit minlevel`
- `,giveaway edit prize`
- `,giveaway edit requiredroles`
- `,giveaway edit thumbnail`
- `,giveaway edit winners`
- `,giveaway end`
- `,giveaway reroll`
- `,giveaway start`

### Music

Listen to music from a variety of sources inside voice channels.

- `,play`
- `,play https`
- `,play jeans`
- `,queue move`
- `,queue remove`
- `,repeat`
- `,repeat current`
- `,seek`
- `,settings autoplay`
- `,settings autoplay on`
- `,settings dj`
- `,volume`

### Webhook

Relay messages through a webhook with a custom username and avatar.

- `,webhook create`
- `,webhook create daddyhook`
- `,webhook delete`
- `,webhook edit`
- `,webhook edit discord`
- `,webhook send`

## Integrations

### Fortnite

Receive shop rotation updates and set reminders for cosmetics.

- `,fortnite item`
- `,fortnite shop`
- `,fortnite shop ping`
- `,fortnite shop voting`
- `,fortnite shop voting on`
- `,fortnite watch`

### Social Notifications

Automatically announce new posts from your favorite creators.

- `,pinterest embeds`
- `,twitter add`
- `,twitter message`
- `,twitter message playboicarti`
- `,twitter remove`
- `,twitter retweets`

### Spotify

Control your Spotify account through Discord.

- `,spotify artists`
- `,spotify play`
- `,spotify seek`
- `,spotify tracks`
- `,spotify volume`

## Resources

### Pagination

Guide to paginating embeds with bleed.

- `,pagination delete`
- `,pagination list`
- `,pagination restorereactions`

### Syntax

General explanation of the syntax used for commands.

- `,timeout`

## Common Issues

### Permissions

How to solve channel permission issues.

- `,lockdown role`

