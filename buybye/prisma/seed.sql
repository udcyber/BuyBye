INSERT INTO "Produit" (nom, prix, categorie, famille, "typeProduit") VALUES
('Lait demi-écrémé 1 L', 1.15, 'Produits laitiers', 'Alimentation', 'Boisson'),
('Pain de campagne', 2.2, 'Boulangerie', 'Alimentation', 'Aliment frais'),
('Pâtes complètes 500 g', 1.6, 'Épicerie', 'Alimentation', 'Aliment sec'),
('Gel douche', 3.5, 'Hygiène', 'Maison', 'Soin'),
('Liquide vaisselle', 2.1, 'Entretien', 'Maison', 'Ménage'),
('Café moulu 250 g', 4.9, 'Épicerie', 'Alimentation', 'Boisson'),
('Pommes bio 1 kg', 3.2, 'Fruits et légumes', 'Alimentation', 'Aliment frais'),
('Dentifrice', 2.8, 'Hygiène', 'Maison', 'Soin');

INSERT INTO "Envie" ("dateAjout", "produitId")
SELECT '2026-10-01', id FROM "Produit" WHERE nom = 'Liquide vaisselle'
UNION ALL
SELECT '2026-09-25', id FROM "Produit" WHERE nom = 'Dentifrice'
UNION ALL
SELECT '2026-09-18', id FROM "Produit" WHERE nom = 'Café moulu 250 g';

INSERT INTO "Achat" (quantite, date, "produitId")
SELECT 6, TIMESTAMP '2026-10-03', id FROM "Produit" WHERE nom = 'Lait demi-écrémé 1 L'
UNION ALL
SELECT 1, TIMESTAMP '2026-10-03', id FROM "Produit" WHERE nom = 'Café moulu 250 g'
UNION ALL
SELECT 2, TIMESTAMP '2026-09-28', id FROM "Produit" WHERE nom = 'Pommes bio 1 kg'
UNION ALL
SELECT 1, TIMESTAMP '2026-09-21', id FROM "Produit" WHERE nom = 'Gel douche'
UNION ALL
SELECT 4, TIMESTAMP '2026-09-14', id FROM "Produit" WHERE nom = 'Pâtes complètes 500 g'
UNION ALL
SELECT 2, TIMESTAMP '2026-09-12', id FROM "Produit" WHERE nom = 'Pain de campagne';
