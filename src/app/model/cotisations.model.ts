export  interface Cotisations{
  id: number;
  montant: number;
  annee: number;
  mois: string;
  statut: boolean;
  membre_id:number;
  paiementId:number;
}
