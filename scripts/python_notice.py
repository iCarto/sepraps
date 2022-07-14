#!/usr/bin/env python3

import argparse
import logging
import pathlib

import pkg_resources


try:
    from pip._internal.utils.misc import get_installed_distributions
except ImportError:  # pragma: no cover
    from pip import get_installed_distributions


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def print_all_in_working_set():
    # print all the package of the virtualenv
    ws = pkg_resources.working_set
    for package_name in ws:
        print(package_name)


def get_dependencies_with_semver_string(package, acc):
    package2 = pkg_resources.working_set.by_key[package.key]
    if package2 in acc:
        return acc
    acc.append(package2)
    if package2.requires():
        return get_dependencies_with_semver_string(package2.requires()[0], acc)
    return acc


def get_packages_in_requirements(file):
    with pathlib.Path(file).open() as requirements_txt:
        packages = [
            requirement
            for requirement in pkg_resources.parse_requirements(requirements_txt)
        ]

    return packages


def main(file):
    packages = get_packages_in_requirements(file)
    deps = []
    for p in packages:
        get_dependencies_with_semver_string(p, deps)
    deps_keys = [p.key for p in deps]
    all_keys = [p.key for p in get_installed_distributions()]
    ignore = [p for p in all_keys if p not in deps_keys]
    print(" ".join(ignore))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="""
    Given a path to a requirements file, and having pip-licenses installed,
    only shows the transitive dependencies of the requirements and not all the
    packages installed in the virtualenv
    """
    )
    parser.add_argument("file", help="Path to a requirements file")
    args = parser.parse_args()
    main(args.file)
