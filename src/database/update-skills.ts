import 'reflect-metadata';
import dataSource from './data-source';
import { Skill } from '../skills/entities/skill.entity';
import { skillSeeds } from './skills-seed';

async function updateSkills() {
  await dataSource.initialize();
  const skillRepo = dataSource.getRepository(Skill);

  const removed = await skillRepo.createQueryBuilder().delete().execute();
  const created = await skillRepo.save(skillRepo.create(skillSeeds));

  const counts = created.reduce<Record<string, number>>((acc, skill) => {
    acc[skill.category] = (acc[skill.category] ?? 0) + 1;
    return acc;
  }, {});

  console.log(
    `Skills updated: removed ${removed.affected ?? 0}, inserted ${created.length}`,
  );
  console.log(`By category: ${JSON.stringify(counts)}`);

  await dataSource.destroy();
}

updateSkills().catch(async (error) => {
  console.error(error);
  await dataSource.destroy().catch(() => undefined);
  process.exit(1);
});