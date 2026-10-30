import unittest
import asyncio
from datetime import datetime
from zoneinfo import ZoneInfo
from pathlib import Path
from agents.study_coach.agent import root_agent, skills_dir
from google.adk.skills import load_skill_from_dir


class AgentTests(unittest.TestCase):
    def test_skills_validate_and_are_discoverable(self):
        skills = [load_skill_from_dir(p) for p in skills_dir.iterdir() if (p / 'SKILL.md').is_file()]
        self.assertEqual({s.frontmatter.name for s in skills}, {'plano-de-estudos', 'active-review'})
        self.assertEqual(root_agent.name, 'study_coach')
        self.assertTrue(all(s.instructions.strip() for s in skills))

    def test_environment_exposes_only_file_tools(self):
        import os
        if os.getenv('STUDYFLOW_ENABLE_ENVIRONMENT', 'true') == 'true':
            tools = asyncio.run(root_agent.tools[-1].get_tools())
            self.assertEqual({t.name for t in tools}, {'ReadFile', 'WriteFile'})
        else:
            self.assertEqual(len(root_agent.tools), 1)

    def test_date_is_injected_and_resources_are_not_in_prompt(self):
        from agents.study_coach.agent import instruction_provider
        instruction = instruction_provider(None)
        self.assertIn(datetime.now(ZoneInfo('America/Bahia')).date().isoformat(), instruction)
        self.assertNotIn('Passo 1: Diagnóstico de Capacidade', instruction)

    def test_lesson_resources_preserved(self):
        source = Path('Aulas 02 e 03/alura-imersao-dev-agy-main/skills/plano-de-estudos')
        for path in source.rglob('*.md'):
            self.assertEqual(path.read_bytes(), (skills_dir / 'plano-de-estudos' / path.relative_to(source)).read_bytes())


if __name__ == '__main__':
    unittest.main()
