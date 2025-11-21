import { UserList } from "@/src/Objects"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

type PersonalStore = {
    users: UserList
    setUsers: (users: UserList) => void
}

export const usePersonal = create<PersonalStore>()( devtools((set) => ({
    users: [],
    setUsers: (users) => set({ users })
})))