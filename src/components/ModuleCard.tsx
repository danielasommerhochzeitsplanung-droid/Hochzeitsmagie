interface ModuleCardProps {
  emoji: string;
  title: string;
  onClick?: () => void;
}

const ModuleCard = ({ emoji, title, onClick }: ModuleCardProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-white p-6 rounded-lg border-2 transition-all hover:shadow-lg hover:scale-105 cursor-pointer"
      style={{ borderColor: '#d6b15b' }}
    >
      <div className="flex flex-col items-center gap-3">
        <span className="text-5xl">{emoji}</span>
        <h3
          className="text-lg"
          style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 'normal' }}
        >
          {title}
        </h3>
      </div>
    </button>
  );
};

export default ModuleCard;
