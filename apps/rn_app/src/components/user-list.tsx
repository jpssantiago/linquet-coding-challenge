import { FlatList } from "react-native"

import { UserListItem } from "./user-list-item"
import { useChatStore } from "../stores/chat.store"

type UserListProps = {
    navigation: any
}

export function UserList({ navigation }: UserListProps) {
    const chatStore = useChatStore()

    return (
        <FlatList
            data={chatStore.chats}
            keyExtractor={(chat) => chat.user.id}
            renderItem={({ item }) => (
                <UserListItem navigation={navigation} item={item} />
            )}
        />
    )
}