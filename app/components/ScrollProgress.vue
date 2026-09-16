<script setup lang="ts">
import { motion, useScroll, useSpring } from 'motion-v'

const { scrollYProgress } = useScroll()
const scaleX = useSpring(scrollYProgress, {
  stiffness: 140,
  damping: 30,
  restDelta: 0.001,
})
</script>

<template>
  <motion.div
    class="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-emerald-mint"
    :style="{ scaleX }"
    aria-hidden="true"
  />
</template>
