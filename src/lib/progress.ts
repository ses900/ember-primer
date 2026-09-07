import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgressState = {
  hydrated: boolean;
  completedLessons: string[];
  completedLabs: string[];
  quizCorrect: Record<string, boolean>;
  lastLesson: string | null;
  completeLesson: (slug: string) => void;
  completeLab: (slug: string) => void;
  markQuiz: (id: string, correct: boolean) => void;
  setLastLesson: (slug: string) => void;
  setHydrated: () => void;
  reset: () => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      hydrated: false,
      completedLessons: [],
      completedLabs: [],
      quizCorrect: {},
      lastLesson: null,
      completeLesson: (slug) =>
        set((s) => ({
          completedLessons: s.completedLessons.includes(slug)
            ? s.completedLessons
            : [...s.completedLessons, slug],
          lastLesson: slug,
        })),
      completeLab: (slug) =>
        set((s) => ({
          completedLabs: s.completedLabs.includes(slug)
            ? s.completedLabs
            : [...s.completedLabs, slug],
        })),
      markQuiz: (id, correct) =>
        set((s) => ({ quizCorrect: { ...s.quizCorrect, [id]: correct } })),
      setLastLesson: (slug) => set({ lastLesson: slug }),
      setHydrated: () => set({ hydrated: true }),
      reset: () =>
        set({
          completedLessons: [],
          completedLabs: [],
          quizCorrect: {},
          lastLesson: null,
        }),
    }),
    { name: "ember-progress", skipHydration: true },
  ),
);
