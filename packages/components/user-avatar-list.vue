<template>
  <div>
    <user-avatar v-for="member in displayMembers" :key="member.userId" :user-name="member.name" :size="size" :avatar="member.avatar">
    </user-avatar>
  </div>
</template>

<script>
import UserAvatar from '@/components/user-avatar'
export default {
  name: "user-avatar-list",
  components: {UserAvatar},
  props: {members: Array, maxSize: {type: Number, default: 6}, size: {type: Number, default: 30}},
  data() {
    return {
      displayMembers: []
    }
  },
  beforeMount() {
    if (this.members.length > this.maxSize) {
      this.displayMembers = this.members.slice(0, this.maxSize);
      this.displayMembers.push({id: -1, name: '...'})
    } else {
      this.displayMembers = this.members;
    }
  },
}
</script>

<style scoped>
</style>