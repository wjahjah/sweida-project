exports.seed = async function(knex) {
  await knex('project_translations').del();
  await knex('projects').del();

  const [proj1, proj2] = await knex('projects').insert([
    { image_url: 'https://images.unsplash.com/photo-1541244029123-24e4460ec3e5', budget: 75000 },
    { image_url: 'https://images.unsplash.com/photo-1590004953392-5aba2e78594b', budget: 120000 }
  ]).returning('id');

  await knex('project_translations').insert([
    { project_id: proj1.id, language: 'ar', title: 'تطوير آبار مياه الري', description: 'تأمين مضخات تعمل بالطاقة الشمسية لـ 50 بئراً في السويداء.' },
    { project_id: proj1.id, language: 'en', title: 'Irrigation Wells Development', description: 'Providing solar-powered pumps for 50 wells in Sweida.' },
    { project_id: proj1.id, language: 'de', title: 'Entwicklung von Bewässerungsbrunnen', description: 'Bereitstellung von Solarpumpen für 50 Brunnen in Sweida.' },
    { project_id: proj2.id, language: 'ar', title: 'مركز التدريب المهني', description: 'تمكين الشباب من خلال دورات تقنية مخصصة لسوق العمل.' },
    { project_id: proj2.id, language: 'en', title: 'Vocational Training Center', description: 'Empowering youth through technical courses tailored for the job market.' },
    { project_id: proj2.id, language: 'de', title: 'Berufsbildungszentrum', description: 'Empowerment von Jugendlichen durch technische Kurse für den Arbeitsmarkt.' }
  ]);
};
