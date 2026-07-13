import burp01 from '@assets/audios/burp_01.mp3'
import burp02 from '@assets/audios/burp_02.mp3'
import burp03 from '@assets/audios/burp_03.mp3'
import fart01 from '@assets/audios/fart_01.mp3'
import fart02 from '@assets/audios/fart_02.mp3'
import fart03 from '@assets/audios/fart_03.mp3'
import pinataGif from '@assets/gallery/angry-girl-beating-pinata.gif'
import gymGif from '@assets/gallery/hello_kitty_gym_workout.gif'
import sleepingImage from '@assets/gallery/hello_kitty_sleeping.png'
import workingImage from '@assets/gallery/hello_kitty_working.jpg'
import girlyVideo from '@assets/gallery/just_a_girl_belching.mp4'
import seductiveImage from '@assets/gallery/marie_just_a_girl.jpg'
import drunkImage from '@assets/gallery/mexican_cat_getting_drunk.jpg'
import type { GalleryItem } from './galleryTypes'

export const GALLERY_HINT = 'Cila Core Gallery'

export const GALLERY_RANDOM_SFX_POOL = [fart01, fart02, fart03, burp01, burp02, burp03] as const

export const GALLERY_ITEMS: readonly GalleryItem[] = [
  {
    id: 'pinata',
    angle: 3,
    media: {
      type: 'gif',
      src: pinataGif,
      alt: 'Cila beating a piñata',
    },
    title: 'Cila beating a piñata',
    description: "That's Cila beating a piñata like it was a broke man who does nothing but disturb her peace.",
    buttons: [
      {
        id: 'denial',
        label: 'I would NEVER do that 😇',
        effect: {
          type: 'modal',
          message: "We all know you would, don't lie",
          variant: 'backdrop-and-x',
        },
      },
      {
        id: 'next',
        label: "That's 100% true lol 😂",
        effect: { type: 'advance' },
      },
    ],
  },
  {
    id: 'working',
    angle: -5,
    media: {
      type: 'image',
      src: workingImage,
      alt: 'Cila working',
    },
    title: 'Cila working',
    description: "That's Cila making millions of dollars selling insurance policies to the rich and famous.",
    buttons: [
      {
        id: 'next',
        label: 'I will be richer than Elon Musk!!! 💰',
        effect: { type: 'advance' },
      },
    ],
  },
  {
    id: 'drunk',
    angle: -2,
    media: {
      type: 'image',
      src: drunkImage,
      alt: 'Cila getting drunk',
    },
    title: 'Cila getting drunk',
    description: "That's a leaked photo of Cila getting drunk on her birthday party from 2020 when she became 21 years old.",
    buttons: [
      {
        id: 'denial',
        label: "I don't remember this 🙈",
        effect: {
          type: 'modal',
          message: "That's exactly what a drunk person would say.",
          variant: 'backdrop-and-x',
        },
      },
      {
        id: 'next',
        label: 'Best day of my life, for sure 🥳',
        effect: { type: 'advance' },
      },
    ],
  },
  {
    id: 'gym',
    angle: 2,
    media: {
      type: 'gif',
      src: gymGif,
      alt: 'Cila at the gym',
    },
    title: 'Cila at the gym',
    description: "That's Cila at the gym doing her best to stay in shape for her upcoming trip to Brazil",
    buttons: [
      {
        id: 'confirmation_1',
        label: 'I will be fitter than a supermodel 🏋🏻‍♀️',
        effect: {
          type: 'modal-confirm',
          message: 'Who is Giselle Bundchen next to you? Poor Giselle is crying on envy right now.',
          confirmLabel: 'Continue',
        },
      },
    ],
  },
  {
    id: 'girly_girl',
    angle: -3,
    media: {
      type: 'video',
      src: girlyVideo,
      alt: 'Cila is so girly',
    },
    title: 'Cila is so girly',
    description: 'The real ones know how girly she is! 👠💅🏻💨',
    buttons: [
      {
        id: 'denial',
        label: 'I never did that in my life 🫣',
        effect: { type: 'randomSfx', pool: 'fart-burp' },
      },
      {
        id: 'next',
        label: 'A girly girl has her needs too! 🤭',
        effect: { type: 'advance' },
      },
    ],
  },
  {
    id: 'sleeping',
    angle: 5,
    media: {
      type: 'image',
      src: sleepingImage,
      alt: 'Cila sleeping like a baby on 03/22/2025 at 04:22 AM',
    },
    title: 'Cila sleeping like a baby on 03/22/2025 at 04:22 AM',
    description: "I took this photo of Cila sleeping before I met her. But I'm not a stalker, I swear!",
    buttons: [
      {
        id: 'running_button',
        label: "You're a stalker, you weirdo! 😠",
        effect: { type: 'runningButton' },
      },
      {
        id: 'next',
        label: 'I need to change my key lock 😨',
        effect: { type: 'advance' },
      },
    ],
  },
  {
    id: 'seductive',
    angle: -1,
    media: {
      type: 'image',
      src: seductiveImage,
      alt: 'Seductive Cila',
    },
    title: 'Seductive Cila',
    description:
      "That's Cila when she is trying to get something, like someone to clean her house, wash dishes, massage her feet, or even the heart of a Brazilian guy",
    buttons: [
      {
        id: 'denial',
        label: 'I thought I already had a Brazilian guy 🤔',
        effect: {
          type: 'modal',
          message: "Oh... huh... I don't know what are you talking about 👀",
          variant: 'backdrop-and-x',
        },
      },
      {
        id: 'next',
        label: 'I always get what I want 💅🏻',
        effect: { type: 'advance' },
      },
    ],
  },
]
