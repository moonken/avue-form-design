<template>
  <div>
    <user-avatar v-for="user in displayUsers" :key="user.id" :user-name="user.name" :size="size" :avatar="user.avatar">
    </user-avatar>
  </div>
</template>

<script>
import UserAvatar from '@/components/user-avatar'
export default {
  name: "user-avatar-list",
  components: {UserAvatar},
  props: {users: Array, maxSize: {type: Number, default: 6}, size: {type: Number, default: 30}},
  data() {
    return {
      displayUsers: []
    }
  },
  beforeMount() {
    if (this.users.length > this.maxSize) {
      this.displayUsers = this.users.slice(0, this.maxSize);
      this.displayUsers.push({id: -1, name: '...'})
    } else {
      this.displayUsers = this.users;
    }
  },
}
</script>

<style scoped>
</style>