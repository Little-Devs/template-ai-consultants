---
name: contact-and-inquiry
description: Explain how to contact Studio and how the inquiry flow works. Use when a user needs the contact email, inquiry page, or form details.
---

# Contact and inquiry

Use this skill when someone wants to get in touch or understand how the inquiry page works.

## Primary contact routes

- Inquiry page: `/inquire`
- Contact email: `hello@example.com`

## Inquiry form flow

The inquiry page collects:

- name
- email
- at least one service selection
- optional notes

## Current service options in the form

The interactive service choices on the current inquiry page are:

- Strategy
- Design
- Development
- Marketing
- Automation
- Custom

## Submission behavior

- the browser posts the form to a Supabase Edge Function
- on success, the user is redirected to `/thank-you`

## Routing guidance

- If someone just needs the fastest path to get in touch, send them to `/inquire`
- If someone only needs the public email address, give them `hello@example.com`
