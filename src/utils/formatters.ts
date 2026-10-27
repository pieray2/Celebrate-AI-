export function formatINR(amount: number | undefined | null, compact: boolean = false): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₹0';
  }

  const rounded = Math.round(amount);

  if (compact) {
    if (Math.abs(rounded) >= 10000000) {
      return `₹${(rounded / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
    }
    if (Math.abs(rounded) >= 100000) {
      return `₹${(rounded / 100000).toFixed(2).replace(/\.00$/, '')} Lakh`;
    }
    if (Math.abs(rounded) >= 1000) {
      return `₹${(rounded / 1000).toFixed(1).replace(/\.0$/, '')}k`;
    }
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rounded);
}

export function formatDatePretty(dateString: string): string {
  if (!dateString) return 'Date to be decided';
  try {
    const [year, month, day] = dateString.split('-');
    if (year && month && day) {
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return date.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function getDaysRemaining(targetDateStr: string): { days: number; label: string; isPast: boolean } {
  if (!targetDateStr) return { days: 0, label: 'No date set', isPast: false };

  let target: Date;
  if (/^\d{4}-\d{2}-\d{2}$/.test(targetDateStr)) {
    const [year, month, day] = targetDateStr.split('-').map(Number);
    target = new Date(year, month - 1, day);
  } else {
    target = new Date(targetDateStr);
  }

  if (isNaN(target.getTime())) {
    return { days: 0, label: 'Date invalid', isPast: false };
  }

  const now = new Date();
  target.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return { days: 0, label: 'Today is Celebration Day! 🎉', isPast: false };
  } else if (diffDays === 1) {
    return { days: 1, label: 'Tomorrow! ⏰', isPast: false };
  } else if (diffDays > 1) {
    return { days: diffDays, label: `${diffDays} days to go`, isPast: false };
  } else {
    return { days: Math.abs(diffDays), label: `Celebrated ${Math.abs(diffDays)} days ago`, isPast: true };
  }
}

