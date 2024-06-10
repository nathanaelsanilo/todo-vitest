<script lang="ts" setup>
import { Form, Field, ErrorMessage } from 'vee-validate'

/**
 * tutorial from vee-validate
 */

type FieldType = {
  label: string
  name: string
  as: string
  type?: string
  children?: { tag: string; value: string | number; text: string }[]
}

defineProps<{
  schema: { fields: FieldType[] }
}>()
</script>

<template>
  <Form>
    <div v-for="{ as, name, label, children, ...attrs } in schema.fields" :key="name" class="field">
      <label :for="name" class="label">{{ label }}</label>
      <div class="control">
        <div :class="{ select: as === 'select' }">
          <Field :id="name" :as="as" :name="name" :class="as" v-bind="attrs">
            <template v-if="children && children.length">
              <component
                :is="tag"
                v-for="({ tag, text, ...childAttrs }, i) in children"
                :key="i"
                v-bind="childAttrs"
              >
                {{ text }}
              </component>
            </template>
          </Field>
        </div>
        <ErrorMessage :name="name" class="help is-danger" />
      </div>
    </div>

    <button class="button is-primary">Submit</button>
  </Form>
</template>
