from datetime import timedelta
from django.utils.timezone import now

from django.db.models import QuerySet
from django.db.models import Sum

from apps.milk.models import Milk


def _sum_liters(qs: QuerySet):
    return qs.aggregate(total=Sum("volume_liters"))["total"] or 0


def _pct_change(current, previous):
    if previous == 0:
        return 0
    return round(((current - previous) / previous) * 100, 2)


def milk_summary_data():

    # Main periods
    today = now().date()
    week_ago = today - timedelta(days=7)
    month_ago = today - timedelta(days=30)

    # Previous periods for comparison
    yesterday = today - timedelta(days=1)
    prev_week_start = today - timedelta(days=14)
    prev_month_start = today - timedelta(days=60)

    qs = Milk.objects.all()

    # Current periods
    today_qs = qs.filter(created_at__date=today)
    week_qs = qs.filter(created_at__date__gte=week_ago)
    month_qs = qs.filter(created_at__date__gte=month_ago)

    # Comparison periods
    yesterday_qs = qs.filter(created_at__date=yesterday)
    prev_week_qs = qs.filter(
        created_at__date__gte=prev_week_start, created_at__date__lt=week_ago
    )
    prev_month_qs = qs.filter(
        created_at__date__gte=prev_month_start, created_at__date__lt=month_ago
    )

    # SUMS
    today_total = _sum_liters(today_qs)
    yesterday_total = _sum_liters(yesterday_qs)

    week_total = _sum_liters(week_qs)
    prev_week_total = _sum_liters(prev_week_qs)

    month_total = _sum_liters(month_qs)
    prev_month_total = _sum_liters(prev_month_qs)

    return {
        "today_total": round(today_total),
        "today_change": _pct_change(today_total, yesterday_total),
        "last_7_days_total": round(week_total),
        "last_7_days_change": _pct_change(week_total, prev_week_total),
        "last_30_days_total": round(month_total),
        "last_30_days_change": _pct_change(month_total, prev_month_total),
        "pickups_today": today_qs.count(),
    }
