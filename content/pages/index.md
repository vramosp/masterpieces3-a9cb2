---
title: Home
layout: PageLayout
sections:
  - type: HeroSection
    elementId: homepage-hero-1
    colors: colors-a
    title: Mar and Layla's Masterpieces
    text: >
      At a very young age, Mar and Layla are already very prolific artists. Here
      you will be able to enjoy some of their masterpieces.
    actions:
      - type: Button
        label: Mar's Art
        url: /blog/author/mar
        style: secondary
        elementId: hero-main-button
        altText: Mar's Art
      - label: Layla's Art
        altText: Layla's Art
        url: /blog/author/layla
        showIcon: false
        icon: arrowRight
        iconPosition: right
        style: secondary
        elementId: ''
        type: Button
    media:
      type: ImageBlock
      url: /images/masterpieces-artists.jpg
      altText: Masterpieces
      caption: Masterpieces
    styles:
      self:
        height: auto
        width: narrow
        margin:
          - mt-0
          - mb-11
          - ml-0
          - mr-0
        padding:
          - pt-12
          - pb-12
          - pr-4
          - pl-4
        alignItems: center
        justifyContent: center
        flexDirection: row
        borderRadius: none
        borderWidth: 0
        borderStyle: none
        borderColor: border-dark
      title:
        textAlign: left
      subtitle:
        textAlign: left
      text:
        textAlign: left
      actions:
        justifyContent: flex-start
  - elementId: ''
    showDate: false
    showAuthor: false
    actions:
      - type: Button
        label: View all
        url: /
        style: primary
    styles:
      self:
        height: auto
        width: wide
        margin:
          - mt-0
          - mb-0
          - ml-0
          - mr-0
        padding:
          - pt-12
          - pb-12
          - pl-4
          - pr-4
        justifyContent: center
        borderRadius: none
        borderWidth: 0
        borderStyle: none
        borderColor: border-dark
      title:
        textAlign: center
      subtitle:
        fontWeight: 400
        fontStyle: normal
        textAlign: center
      actions:
        justifyContent: center
    title: Recent Posts
    subtitle: Latest blog posts section example
    variant: variant-a
    colors: colors-h
    recentCount: 6
    type: RecentPostsSection
---
