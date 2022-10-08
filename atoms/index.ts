/**
 * Записываем сюда все атомы
 */
export const atoms = {};

export type AtomsKey = keyof typeof atoms;

/**
 * Функция для инициализации начального состояния на сервере
 */
export const initializeRecoilState =
    (initialRecoilState: Partial<Record<AtomsKey, any>>) =>
    ({ set }: any) =>
        Object.keys(initialRecoilState).map((key) => {
            const value = (initialRecoilState as any)[key];
            const atom = (atoms as any)[key];
            set(atom, value);
        });
