import React, { useState } from 'react';
import { Plus } from '@phosphor-icons/react';
import { useDashboard } from '../../state/useDashboard';
import { ClassCard } from './components/ClassCard';
import { InlineCreateClassCard } from './components/InlineCreateClassCard';
import { ClassDetailsModal } from './components/ClassDetailsModal';
import { CreateClassModal } from './components/CreateClassModal';
import type { ClassItem } from '../dashboard/types/dashboardTypes';

export const ClassesTab: React.FC = () => {
  const { classes, isAddClassOpen, setIsAddClassOpen } = useDashboard();
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);

  return (
    <div className="space-y-6 text-right">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="heading-4 text-[#181818]">الصفوف</h2>
          <p className="body-6 text-zinc-600 mt-1">
            كل صف له مواعيده المستقلة وسعر حصته وكود انضمام خاص به
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddClassOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white button-sm rounded-xl min-h-[44px] motion-base active:scale-[0.98] focus-ring cursor-pointer"
        >
          <Plus size={18} weight="bold" />
          <span>إضافة صف</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <ClassCard
            key={cls.id}
            classItem={cls}
            onSelect={(item) => setSelectedClass(item)}
          />
        ))}
      </div>

      <InlineCreateClassCard />

      <ClassDetailsModal
        isOpen={!!selectedClass}
        onClose={() => setSelectedClass(null)}
        classItem={selectedClass}
      />

      <CreateClassModal
        isOpen={isAddClassOpen}
        onClose={() => setIsAddClassOpen(false)}
      />
    </div>
  );
};
