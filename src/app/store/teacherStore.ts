import { create } from "zustand";
import { persist } from "zustand/middleware";
import { teacherInterface } from "../types/teacher.type";



interface TeacherState {
  teacher: teacherInterface | null;
  setTeacher: (teacher: teacherInterface) => void;
  clearTeacher: () => void;
}

export const useTeacherStore = create<TeacherState>()(
  persist(
    (set) => ({
      teacher: null,
      setTeacher: (teacher) => set({ teacher }),
      clearTeacher: () => set({ teacher: null }),
    }),
    {
      name: "teacher-storage", // key in localStorage
    }
  )
);
