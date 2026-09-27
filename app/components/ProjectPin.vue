<script setup lang="ts">
import type { ProjectDetail } from './ProjectModal.vue'

// A single project printed on a sheet of paper and pinned to the corkboard.
// The whole sheet — screenshot and caption included — is one button, so a click
// anywhere (and the image especially) opens the project detail. Hover only
// lifts the sheet and pushes the screenshot forward.
const props = defineProps<{
  project: ProjectDetail
}>()

const emit = defineEmits<{
  open: [project: ProjectDetail, e: Event]
}>()

const { t } = useI18n()
</script>

<template>
  <button
    type="button"
    class="pin-paper"
    @click="emit('open', project, $event)"
  >
    <span class="pin" aria-hidden="true" />

    <span class="pin-paper__sheet">
      <span class="pin-paper__shot">
        <ProjectVisual :label="project.title" :image="project.images?.[0]" />
      </span>

      <span class="pin-paper__caption">
        <span class="pin-paper__name">{{ project.title }}</span>
        <span class="pin-paper__desc">{{ t(`projects.items.${project.key}.short`) }}</span>
      </span>

      <span class="sr-only">{{ t('projects.viewProjectAria', { title: project.title }) }}</span>
    </span>
  </button>
</template>
