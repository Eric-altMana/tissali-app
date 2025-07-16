import { ClientType, LocalisationType, PanierType, ProduitType, VendeurType } from '@/app/Types/Types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Définition du type d'état global du store
type State = {
  clientStore: ClientType | null;
  setClientStore: (clientStore: ClientType | null) => void;

  vendeurStore: VendeurType | null;
  setVendeurStore: (vendeurStore: VendeurType | null) => void;

  produitStore: ProduitType | null;
  setProduitsStore: (produitStore: ProduitType | null) => void;

  localisation: LocalisationType;
  setLocalisation: (loc: LocalisationType) => void;
};




// Création du store Zustand avec persist
export const useStore = create<State>()(
  persist(
    (set) => ({
      clientStore: null,
      setClientStore: (clientStore) => set(() => ({ clientStore: clientStore })),

      vendeurStore: null,
      setVendeurStore: (vendeurStore) => set(() => ({ vendeurStore: vendeurStore })),

      produitStore: null,
      setProduitsStore: (produitStore) => set(() => ({ produitStore: produitStore })),

      localisation: { region: '', ville: '', quartier: '' },
      setLocalisation: (loc) => set(() => ({ localisation: loc })),
    }),
    {
      name: 'tissali-storage', // nom de la clé dans le localStorage
    }
  )
);



// Pour typer le store
type PanierStoreType = {
  panier: PanierType[],
  nbreEls: number,
  addPanierStore: (els: PanierType[]) => void,
  incQteEls: (id: string) => void,
  decQteEls: (id: string) => void,
  deleteQteEls: (id: string) => void,
  videPanier: () => void
}
export const PanierStore = create<PanierStoreType>()(
  persist(
    (set) => ({
      panier: [],
      nbreEls: 0,

      addPanierStore: (els) => set({ panier: els }),

      incQteEls: (id) => set((state) => {
        const updatedPanier = state.panier.map(item =>
          item.id === id ? { ...item, qte: item.qte + 1 } : item
        )
        return {
          panier: updatedPanier,
          nbreEls: state.nbreEls + 1
        }
      }),

      decQteEls: (id) => set((state) => {
        const updatedPanier = state.panier.map(item => {
          if (item.id === id && item.qte > 1) {
            return { ...item, qte: item.qte - 1 }
          }
          return item
        })
        const itemToUpdate = state.panier.find(item => item.id === id)
        const shouldDecrease = itemToUpdate && itemToUpdate.qte > 1
        return {
          panier: updatedPanier,
          nbreEls: shouldDecrease ? state.nbreEls - 1 : state.nbreEls
        }
      }),

      deleteQteEls: (id) => set((state) => {
        const itemToDelete = state.panier.find(item => item.id === id)
        const qteToRemove = itemToDelete ? itemToDelete.qte : 0
        return {
          panier: state.panier.filter(item => item.id !== id),
          nbreEls: state.nbreEls - qteToRemove
        }
      }),

      videPanier: () => ({
        panier: [],
        nbreEls: 0
      })
    }),
    {
      name: 'panier-storage',
      partialize: (state) => ({ panier: state.panier, nbreEls: state.nbreEls })
    }
  )
)


export default useStore;