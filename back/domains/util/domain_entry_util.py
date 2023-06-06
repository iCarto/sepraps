from domains.models import DomainEntry


def dominio_get_value(searched_key, searched_category, cached_domain=None):
    # Try to replace in future to work only for cached results
    if cached_domain:
        for domain_entry in cached_domain:
            found_domain_entry = (
                domain_entry.key == searched_key
                and domain_entry.category == searched_category
            )
            if found_domain_entry:
                return domain_entry.value
    result = DomainEntry.objects.filter(key=searched_key, category=searched_category)
    if result:
        if result[0].value is None:
            return None
        return result[0].value.strip()
    elif searched_key is None:
        return ""
    return searched_key


def dominio_get_values(array_value, searched_category, cached_domain=None):
    labels = []
    if array_value:
        for key in array_value:
            labels.append(dominio_get_value(key, searched_category, cached_domain))
        return ", ".join(map(str, labels))
    return ""


def dominio_get_label(key_values, searched_category, cached_domain=None):
    labels = []
    if key_values is not None:
        if isinstance(key_values, list):
            for key in key_values:
                labels.append(dominio_get_value(key, searched_category, cached_domain))
            return ", ".join(map(str, labels))
        return dominio_get_value(key_values, searched_category, cached_domain)
    return ""
