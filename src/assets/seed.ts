import { Board } from '../types';

export const SEED_MEMBERS = [
  { id: 'm1', name: 'Adi Santoso', avatarUrl: 'https://i.pravatar.cc/40?img=1' },
  { id: 'm2', name: 'Budi Pratama', avatarUrl: 'https://i.pravatar.cc/40?img=2' },
  { id: 'm3', name: 'Citra Dewi', avatarUrl: 'https://i.pravatar.cc/40?img=3' },
  { id: 'm4', name: 'Dina Rahayu', avatarUrl: 'https://i.pravatar.cc/40?img=4' },
  { id: 'm5', name: 'Eko Wijaya', avatarUrl: 'https://i.pravatar.cc/40?img=5' }
];

export const SEED_BOARD: Board = {
  id: 'board-1',
  name: 'Adhivasindo Task Management',
  columns: [
    {
      id: 'col-todo',
      title: 'To Do',
      tasks: [
        {
          id: 'task-1',
          columnId: 'col-todo',
          title: 'Research for a podcast and video website',
          description: 'Gather references and benchmark similar platforms for design inspiration.',
          assignees: ['m1', 'm2'],
          dueDate: '2025-08-08',
          label: 'Feature',
          priority: 'Medium',
          checklist: [
            { id: 'cl-1', text: 'Collect 10 reference sites', completed: true },
            { id: 'cl-2', text: 'Summarize findings in doc', completed: false }
          ],
          attachments: [],
          coverImage: null,
          createdAt: '2025-08-01T08:00:00Z'
        },
        {
          id: 'task-2',
          columnId: 'col-todo',
          title: 'Debug checkout process for the e-commerce website',
          description: 'Identify and fix all bugs in the checkout flow including payment gateway errors.',
          assignees: ['m1', 'm3', 'm4'],
          dueDate: '2025-08-10',
          label: 'Bug',
          priority: 'High',
          checklist: [
            { id: 'cl-3', text: 'Reproduce the bug', completed: true },
            { id: 'cl-4', text: 'Fix payment gateway', completed: true },
            { id: 'cl-5', text: 'Write regression test', completed: false }
          ],
          attachments: [
            { id: 'att-1', fileName: 'bug_report.pdf', fileType: 'pdf', size: '120KB' },
            { id: 'att-2', fileName: 'screenshot.png', fileType: 'image', size: '85KB' }
          ],
          coverImage: null,
          createdAt: '2025-08-02T09:00:00Z'
        }
      ]
    },
    {
      id: 'col-doing',
      title: 'Doing',
      tasks: [
        {
          id: 'task-3',
          columnId: 'col-doing',
          title: 'Design wireframes for the landing page revamp',
          description: 'Create low-fi and hi-fi wireframes for all key landing page sections.',
          assignees: ['m3', 'm4'],
          dueDate: '2025-08-12',
          label: 'Feature',
          priority: 'High',
          checklist: [],
          attachments: [],
          coverImage: 'https://picsum.photos/seed/wireframe/400/200',
          createdAt: '2025-08-03T10:00:00Z'
        },
        {
          id: 'task-4',
          columnId: 'col-doing',
          title: 'Install and set up a marketing tool for team operations',
          description: 'Evaluate and configure HubSpot for team marketing automation.',
          assignees: ['m1', 'm2', 'm5'],
          dueDate: '2025-08-14',
          label: 'Undefined',
          priority: 'Low',
          checklist: [
            { id: 'cl-6', text: 'Create HubSpot account', completed: true },
            { id: 'cl-7', text: 'Connect email domain', completed: false }
          ],
          attachments: [],
          coverImage: null,
          createdAt: '2025-08-04T11:00:00Z'
        }
      ]
    },
    {
      id: 'col-review',
      title: 'Review',
      tasks: [
        {
          id: 'task-5',
          columnId: 'col-review',
          title: 'Create and refine logo designs for the UI brand',
          description: 'Design at least 3 logo concepts and present to stakeholders for review.',
          assignees: ['m2', 'm3'],
          dueDate: '2025-08-15',
          label: 'Issue',
          priority: 'Medium',
          checklist: [],
          attachments: [],
          coverImage: 'https://picsum.photos/seed/logo/400/200',
          createdAt: '2025-08-05T12:00:00Z'
        },
        {
          id: 'task-6',
          columnId: 'col-review',
          title: 'Create an icon library for the project',
          description: 'Build a reusable icon set using SVG sprites following the design system.',
          assignees: ['m1', 'm4'],
          dueDate: '2025-08-08',
          label: 'Feature',
          priority: 'Low',
          checklist: [
            { id: 'cl-8', text: 'Define icon categories', completed: true },
            { id: 'cl-9', text: 'Export all SVGs', completed: true },
            { id: 'cl-10', text: 'Publish to Figma library', completed: false }
          ],
          attachments: [],
          coverImage: null,
          createdAt: '2025-08-06T08:00:00Z'
        }
      ]
    },
    {
      id: 'col-done',
      title: 'Done',
      tasks: [
        {
          id: 'task-7',
          columnId: 'col-done',
          title: 'Create the Email Page layout and necessary components',
          description: 'Build the email campaign page with all reusable components.',
          assignees: ['m2', 'm3'],
          dueDate: '2025-08-01',
          label: 'Feature',
          priority: 'High',
          checklist: [
            { id: 'cl-11', text: 'Design layout', completed: true },
            { id: 'cl-12', text: 'Build components', completed: true }
          ],
          attachments: [],
          coverImage: null,
          createdAt: '2025-07-25T08:00:00Z'
        },
        {
          id: 'task-8',
          columnId: 'col-done',
          title: 'Enhance website usability through user feedback',
          description: 'Analyze usability test results and implement UI improvements.',
          assignees: ['m1', 'm2'],
          dueDate: '2025-07-30',
          label: 'Feature',
          priority: 'Medium',
          checklist: [],
          attachments: [],
          coverImage: 'https://picsum.photos/seed/usability/400/200',
          createdAt: '2025-07-20T08:00:00Z'
        }
      ]
    },
    {
      id: 'col-rework',
      title: 'Rework',
      tasks: [
        {
          id: 'task-9',
          columnId: 'col-rework',
          title: 'Blog Edit Page Modification and Playlist Page Design',
          description: 'Revise the blog edit page based on PM feedback and design the playlist section.',
          assignees: ['m3', 'm5'],
          dueDate: '2025-08-08',
          label: 'Feature',
          priority: 'High',
          checklist: [
            { id: 'cl-13', text: 'Apply PM feedback', completed: true },
            { id: 'cl-14', text: 'Design playlist page', completed: false }
          ],
          attachments: [],
          coverImage: null,
          createdAt: '2025-08-07T09:00:00Z'
        },
        {
          id: 'task-10',
          columnId: 'col-rework',
          title: 'Plan and execute training sessions for new hires',
          description: 'Prepare onboarding materials and schedule training sessions for the new team members.',
          assignees: ['m1', 'm4'],
          dueDate: '2025-08-09',
          label: 'Issue',
          priority: 'Medium',
          checklist: [
            { id: 'cl-15', text: 'Prepare slides', completed: true },
            { id: 'cl-16', text: 'Schedule sessions', completed: true },
            { id: 'cl-17', text: 'Gather feedback post-training', completed: false }
          ],
          attachments: [
            { id: 'att-3', fileName: 'training_plan.docx', fileType: 'document', size: '210KB' }
          ],
          coverImage: null,
          createdAt: '2025-08-06T10:00:00Z'
        }
      ]
    }
  ]
};
