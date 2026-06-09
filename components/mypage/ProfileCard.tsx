import SignOutButton from '@/components/ui/SignOutButton';

interface Props {
  name: string;
  email: string;
}

export default function ProfileCard({ name, email }: Props) {
  return (
    <section className="mb-8 md:mb-12">
      <div className="bg-surface-container-lowest rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
          <span className="material-symbols-outlined text-[40px] md:text-[48px]">pets</span>
        </div>
        <div className="flex-grow text-center md:text-left">
          <h1 className="text-headline-sm md:text-headline-lg text-on-surface mb-1">
            안녕하세요, {name || '회원'}님!
          </h1>
          <p className="text-body-md text-secondary">{email}</p>
        </div>
        <div className="w-full md:w-auto">
          <SignOutButton className="w-full px-6 py-3 bg-surface-container-lowest border border-outline-variant text-primary text-label-md rounded-lg hover:bg-surface-container transition-colors cursor-pointer" />
        </div>
      </div>
    </section>
  );
}
